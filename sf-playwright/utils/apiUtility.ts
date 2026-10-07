import { APIRequestContext, expect } from "@playwright/test";
import { getEnv } from "./env";

export interface LeadData {
  Salutation?: string;
  FirstName?: string;
  LastName: string;
  Company: string;
}

export class SalesForceAPI {
  private readonly baseUrl = getEnv("SF_BASE_URL");
  private readonly apiVersion = "v67.0";
  private token = "";
  private createdLeadIds: string[] = [];

  constructor(private request: APIRequestContext) {}

  private get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  private leadUrl(id = "") {
    return `${this.baseUrl}/services/data/${this.apiVersion}/sobjects/Lead/${id}`;
  }

  /** OAuth client-credentials flow. Must be called before any other API method. */
  async generateToken(): Promise<void> {
    const response = await this.request.post(`${this.baseUrl}/services/oauth2/token`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "client_credentials",
        client_id: getEnv("SF_CLIENT_ID"),
        client_secret: getEnv("SF_CLIENT_SECRET"),
      },
    });
    expect(response.status(), "OAuth token request should return 200").toBe(200);

    const body = await response.json();
    this.token = body.access_token;
    expect(this.token, "access_token should be present").toBeTruthy();
  }

  /** Creates a Lead and returns its ID. The lead is tracked so cleanup() can delete it. */
  async createLead(data: LeadData): Promise<string> {
    const response = await this.request.post(this.leadUrl(), {
      headers: this.headers,
      data,
    });
    expect(response.status(), "Create lead should return 201").toBe(201);

    const body = await response.json();
    this.createdLeadIds.push(body.id);
    return body.id;
  }

  /** Fetches a Lead record by ID. */
  async getLead(id: string): Promise<Record<string, any>> {
    const response = await this.request.get(this.leadUrl(id), { headers: this.headers });
    expect(response.status(), "Fetch lead should return 200").toBe(200);
    return response.json();
  }

  /** Deletes a Lead by ID. */
  async deleteLead(id: string): Promise<void> {
    const response = await this.request.delete(this.leadUrl(id), { headers: this.headers });
    expect(response.status(), "Delete lead should return 204").toBe(204);
    this.createdLeadIds = this.createdLeadIds.filter((x) => x !== id);
  }

  /** Deletes every lead this instance created. Errors are ignored so teardown never fails a test. */
  async cleanup(): Promise<void> {
    for (const id of this.createdLeadIds) {
      await this.request.delete(this.leadUrl(id), { headers: this.headers }).catch(() => {});
    }
    this.createdLeadIds = [];
  }
}

import request from "supertest";
import express, { Express } from "express";

const app: Express = express();
app.use(express.json());

describe("POST /upload", () => {
  it("should return 409 if the reading already exists", async () => {
    jest
      .spyOn(
        require("../../modules/measure/measure.service"),
        "existMonthMeasure"
      )
      .mockResolvedValue(true);

    const response = await request(app).post("/api/measures/upload").send({
      image:
        "MWVhYWEyMjlhNmE0ZTAxNzdlMDlkOWI0ZjdlMDJlNmNkN2MwNTM0ZjExZmI4MzE5YWZhZTFlMmFiYTdjN2YxZA==",
      customer_code: "5455",
      measure_datetime: "2024-10-30T02:40:30.750+00:00",
      measure_type: "water",
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error_code: "DOUBLE_REPORT",
      error_description: "Leitura do mês já realizada",
    });
  });
});

describe("GET /test-all", () => {
  it(`should return 200 with all readings `, async () => {
    await request("http://localhost:3333")
      .get(`/api/test-all`)
      .expect(200)
      .then((response: any) => {
        console.log(response.body);
      });
  });
});

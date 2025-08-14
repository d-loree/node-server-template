import { Writable } from "stream";
import pino from "pino";

describe("Logger", () => {
    let output = "";
    let stream;

    beforeEach(() => {
        output = "";
        stream = new Writable({
            write(chunk, encoding, callback) {
                output += chunk.toString();
                callback();
            },
        });
    });

    it("should log debug message in development mode", async () => {
        const testLogger = pino(
            {
                level: "debug",
                timestamp: pino.stdTimeFunctions.isoTime,
            },
            stream
        );

        testLogger.debug("debug message");

        await new Promise((resolve) => setTimeout(resolve, 10));

        expect(output).toContain("debug message");
    });

    it("should log info message", async () => {
        const testLogger = pino(
            {
                level: "info",
                timestamp: pino.stdTimeFunctions.isoTime,
            },
            stream
        );

        testLogger.info("info message");

        await new Promise((resolve) => setTimeout(resolve, 10));

        expect(output).toContain("info message");
    });
});

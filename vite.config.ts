import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import nodemailer from "nodemailer";

function contactApiPlugin(gmailUser: string, gmailAppPassword: string) {
    let transporter;

    return {
        name: "vite-plugin-contact-api",
        configureServer(server) {
            // Initialize Gmail transporter on first request
            const getTransporter = () => {
                if (!transporter) {
                    if (!gmailUser || !gmailAppPassword) {
                        throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD env vars are required");
                    }

                    transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: gmailUser,
                            pass: gmailAppPassword,
                        },
                    });
                }
                return transporter;
            };

            server.middlewares.use(async (req, res, next) => {
                if (!req.url || req.method !== "POST" || req.url !== "/api/contact") {
                    return next();
                }

                try {
                    let raw = "";
                    for await (const chunk of req) {
                        raw += chunk;
                    }

                    const data = JSON.parse(raw || "{}");
                    const { name, email, subject, message } = data;

                    if (!name || !email || !subject || !message) {
                        res.statusCode = 400;
                        res.setHeader("Content-Type", "application/json");
                        return res.end(JSON.stringify({ error: "Missing required fields" }));
                    }

                    const transport = getTransporter();

                    // Send email to your Gmail inbox
                    await transport.sendMail({
                        from: gmailUser,
                        to: gmailUser,
                        replyTo: email,
                        subject: `Portfolio Contact: ${subject}`,
                        html: `
                            <h2>New contact message from your portfolio</h2>
                            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                            <h3>Message:</h3>
                            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
                        `,
                    });

                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    return res.end(JSON.stringify({ message: "Email sent successfully" }));
                } catch (error) {
                    console.error("Contact API error:", error);
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    return res.end(
                        JSON.stringify({
                            error: error instanceof Error ? error.message : "Internal server error",
                        })
                    );
                }
            });
        },
    };
}

function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const gmailUser = env.GMAIL_USER;
    const gmailAppPassword = env.GMAIL_APP_PASSWORD;

    return {
        server: {
            host: "::",
            port: 8080,
            hmr: {
                overlay: false,
            },
        },
        plugins: [react(), mode === "development" && componentTagger(), contactApiPlugin(gmailUser, gmailAppPassword)].filter(Boolean),
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };
});

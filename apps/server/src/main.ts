import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Entry point of the NOVA backend.
 *
 * Boots the NestJS application. The server listens on the port defined
 * in the PORT environment variable (default 3210) and is the single
 * process the desktop app talks to over HTTP and WebSocket.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // ------------------------------------------------------------------
  // CORS — restrict to the app's own origin only.
  // Security rule: never open CORS to "*" in production. Only the
  // desktop app origin may call this API. In dev that is the Vite
  // server (port 1420); the allowed origin is overridable via the
  // CORS_ORIGIN environment variable.
  // ------------------------------------------------------------------
  const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:1420';
  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no Origin header, e.g. the Tauri app)
      // and requests from the configured origin.
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  });

  const port = Number(process.env.PORT) || 3210;
  await app.listen(port);
  console.log(`NOVA server listening on http://localhost:${port}`);
}

void bootstrap();

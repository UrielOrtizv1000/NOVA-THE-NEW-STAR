import { Module } from '@nestjs/common';

/**
 * Root module of the NOVA backend.
 *
 * NestJS composes the application from modules. Each feature (auth,
 * chat, calls, users, presence) will register its own module here as it
 * is implemented. For now this is the empty skeleton.
 */
@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}

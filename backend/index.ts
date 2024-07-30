import app from '@app';
import connectDB from '@common/database/connectDB';
import logger from '@common/logger';
import config from '@config';

app.listen(config.server.port, config.server.host, async () => {
  await connectDB(config.db.url);
  logger.info(`Server started on http://${config.server.host}:${config.server.port}`);
});

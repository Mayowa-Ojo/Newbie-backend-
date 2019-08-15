const cors             = require('cors');
const chalk            = require('chalk');
const env              = require('dotenv');
const express          = require('express');
const mongoose         = require('mongoose');
const methodOverride   = require('method-override');
const expressSanitizer = require('express-sanitizer');
/* Relative imports */
const postRouter       = require('./routes/posts');
const commentRouter    = require('./routes/comments');
const commentRepliesRouter = require('./routes/comment-replies');

/* setup express */
const app = express();
env.config();

/* global variables */
const { log } = console;
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;

/* connect mongoose */
mongoose.connect(DATABASE_URI, { useNewUrlParser: true })
  .then(() => {
    log(`${chalk.bgMagenta('connected to database')}`)
  })
  .catch((err) => {
    log(`${chalk.red(err)}`)
  })

/* setup middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));
app.use('/api/posts', postRouter);
app.use('/api/posts/:id/comments', commentRouter);
app.use('/api/posts/:id/comments/:comment_id/replies', commentRepliesRouter);

/* pseudo-route */
app.get('/', (req, res) => {
  res.json({message: 'Welcome to newbie.dev'});
})

app.listen(PORT, () => {
  log(`server running on port ${chalk.bgWhite.magenta(PORT)}`);
})
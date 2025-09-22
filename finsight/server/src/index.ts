import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { userRouter } from './user/user.router';
import { expenseRouter } from './expense/expense.router'; // Import the new router

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRouter);
app.use('/api/expenses', expenseRouter); // Use the new router

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});

import { UserAnswerService } from './userAnswer.service.js';
const toNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};
export class UserAnswerController {
    userAnswerService;
    constructor(userAnswerService = new UserAnswerService()) {
        this.userAnswerService = userAnswerService;
    }
    list = async (_req, res, next) => {
        try {
            const answers = await this.userAnswerService.findAll();
            res.json(answers);
        }
        catch (error) {
            next(error);
        }
    };
    getOne = async (req, res, next) => {
        try {
            const id = toNumber(req.params.id);
            if (id === undefined) {
                res.status(400).json({ message: 'Invalid user answer id' });
                return;
            }
            const answer = await this.userAnswerService.findById(id);
            if (!answer) {
                res.status(404).json({ message: 'User answer not found' });
                return;
            }
            res.json(answer);
        }
        catch (error) {
            next(error);
        }
    };
    listByAttempt = async (req, res, next) => {
        try {
            const attemptId = toNumber(req.params.userQuizId);
            if (attemptId === undefined) {
                res.status(400).json({ message: 'Invalid userQuiz id' });
                return;
            }
            const answers = await this.userAnswerService.findByUserQuiz(attemptId);
            res.json(answers);
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        try {
            const { userId, userQuizId, questionId, answerId } = req.body;
            const parsedUserId = toNumber(userId);
            const parsedUserQuizId = toNumber(userQuizId);
            const parsedQuestionId = toNumber(questionId);
            const parsedAnswerId = toNumber(answerId);
            if (parsedUserId === undefined ||
                parsedUserQuizId === undefined ||
                parsedQuestionId === undefined ||
                parsedAnswerId === undefined) {
                res.status(400).json({ message: 'userId, userQuizId, questionId and answerId must be numbers' });
                return;
            }
            const created = await this.userAnswerService.create({
                userId: parsedUserId,
                userQuizId: parsedUserQuizId,
                questionId: parsedQuestionId,
                answerId: parsedAnswerId
            });
            res.status(201).json(created);
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const id = toNumber(req.params.id);
            if (id === undefined) {
                res.status(400).json({ message: 'Invalid user answer id' });
                return;
            }
            const { userId, userQuizId, questionId, answerId } = req.body;
            const parsedUserId = userId !== undefined ? toNumber(userId) : undefined;
            if (userId !== undefined && parsedUserId === undefined) {
                res.status(400).json({ message: 'userId must be a number' });
                return;
            }
            const parsedUserQuizId = userQuizId !== undefined ? toNumber(userQuizId) : undefined;
            if (userQuizId !== undefined && parsedUserQuizId === undefined) {
                res.status(400).json({ message: 'userQuizId must be a number' });
                return;
            }
            const parsedQuestionId = questionId !== undefined ? toNumber(questionId) : undefined;
            if (questionId !== undefined && parsedQuestionId === undefined) {
                res.status(400).json({ message: 'questionId must be a number' });
                return;
            }
            const parsedAnswerId = answerId !== undefined ? toNumber(answerId) : undefined;
            if (answerId !== undefined && parsedAnswerId === undefined) {
                res.status(400).json({ message: 'answerId must be a number' });
                return;
            }
            const updated = await this.userAnswerService.update(id, {
                userId: parsedUserId,
                userQuizId: parsedUserQuizId,
                questionId: parsedQuestionId,
                answerId: parsedAnswerId
            });
            res.json(updated);
        }
        catch (error) {
            next(error);
        }
    };
    remove = async (req, res, next) => {
        try {
            const id = toNumber(req.params.id);
            if (id === undefined) {
                res.status(400).json({ message: 'Invalid user answer id' });
                return;
            }
            await this.userAnswerService.remove(id);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    };
}

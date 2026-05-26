import { AnswerService } from './answer.service.js';
const toNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};
export class AnswerController {
    answerService;
    constructor(answerService = new AnswerService()) {
        this.answerService = answerService;
    }
    list = async (_req, res, next) => {
        try {
            const answers = await this.answerService.findAll();
            res.json(answers);
        }
        catch (error) {
            next(error);
        }
    };
    listByQuestion = async (req, res, next) => {
        try {
            const questionId = toNumber(req.params.questionId);
            if (questionId === undefined) {
                res.status(400).json({ message: 'Invalid question id' });
                return;
            }
            const answers = await this.answerService.findByQuestion(questionId);
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
                res.status(400).json({ message: 'Invalid answer id' });
                return;
            }
            const answer = await this.answerService.findById(id);
            if (!answer) {
                res.status(404).json({ message: 'Answer not found' });
                return;
            }
            res.json(answer);
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        try {
            const { text, isCorrect, questionId } = req.body;
            if (!text) {
                res.status(400).json({ message: 'Answer text is required' });
                return;
            }
            const parsedQuestionId = toNumber(questionId);
            if (parsedQuestionId === undefined) {
                res.status(400).json({ message: 'questionId must be a number' });
                return;
            }
            const answer = await this.answerService.create({
                text,
                isCorrect,
                questionId: parsedQuestionId
            });
            res.status(201).json(answer);
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const id = toNumber(req.params.id);
            if (id === undefined) {
                res.status(400).json({ message: 'Invalid answer id' });
                return;
            }
            const { text, isCorrect, questionId } = req.body;
            const parsedQuestionId = questionId !== undefined ? toNumber(questionId) : undefined;
            if (questionId !== undefined && parsedQuestionId === undefined) {
                res.status(400).json({ message: 'questionId must be a number' });
                return;
            }
            const updated = await this.answerService.update(id, {
                text,
                isCorrect,
                questionId: parsedQuestionId
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
                res.status(400).json({ message: 'Invalid answer id' });
                return;
            }
            await this.answerService.remove(id);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    };
}

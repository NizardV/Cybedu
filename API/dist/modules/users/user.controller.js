import { UserService } from './user.service.js';
const toNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};
const sanitizeUser = (user) => {
    if (!user) {
        return user;
    }
    const { password, ...rest } = user;
    return rest;
};
export class UserController {
    userService;
    constructor(userService = new UserService()) {
        this.userService = userService;
    }
    list = async (_req, res, next) => {
        try {
            const users = await this.userService.findAll();
            res.json(users.map(sanitizeUser));
            console.log("list user GET succeded");
        }
        catch (error) {
            console.error("Error during getting list of users");
            next(error);
        }
    };
    getOne = async (req, res, next) => {
        try {
            const id = toNumber(req.params.id);
            if (id === undefined) {
                res.status(400).json({ message: 'Invalid user id' });
                return;
            }
            const user = await this.userService.findById(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(sanitizeUser(user));
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: 'email and password are required' });
                return;
            }
            const user = await this.userService.create({ email, password });
            res.status(201).json(sanitizeUser(user));
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const id = toNumber(req.params.id);
            if (id === undefined) {
                res.status(400).json({ message: 'Invalid user id' });
                return;
            }
            const { email, password } = req.body;
            if (email === undefined && password === undefined) {
                res.status(400).json({ message: 'Nothing to update' });
                return;
            }
            const user = await this.userService.update(id, { email, password });
            res.json(sanitizeUser(user));
        }
        catch (error) {
            next(error);
        }
    };
    remove = async (req, res, next) => {
        try {
            const id = toNumber(req.params.id);
            if (id === undefined) {
                res.status(400).json({ message: 'Invalid user id' });
                return;
            }
            await this.userService.remove(id);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    };
}

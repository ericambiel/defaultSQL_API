import User from '../models/user';

export default class UserController {
  async insert(user: Object) {
    await User. .default().create({name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456'});
  }
}
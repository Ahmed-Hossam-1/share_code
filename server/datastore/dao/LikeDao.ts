import { Like } from '../../types/types';

export interface LikeDao {
  createLike(like: Like): Promise<void>;
}

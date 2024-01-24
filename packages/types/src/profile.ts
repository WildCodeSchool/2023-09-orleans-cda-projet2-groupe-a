export interface CommentsProfile {
  score: number;
  content: string;
  cocktail_id: number;
  cocktail_name: string;
  comment_id: number;
}

export interface CocktailsProfile {
  cocktail_id: number;
  cocktail_image: string;
  avg_rating: number;
  cocktail_name: string;
  ingredient_name: string;
  family: string;
}

export interface UserProfile {
  pseudo: string;
  image: string;
  color: string;
  email: string;
  comments: CommentsProfile[] | null;
  cocktails: CocktailsProfile[] | null;
}

export interface UserInfoForm {
  pseudo: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  color: string;
  image: string;
}

export interface UpdateData {
  anecdote?: string | undefined;
  image?: string | undefined;
}

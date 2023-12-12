export interface CommentsProfile {
  score: number;
  content: string;
  cocktail_id: number;
  cocktail_name: string;
}

export interface CocktailsProfile {
  cocktail_id: number;
  avg_rating: number;
  cocktail_name: string;
  ingredient_name: string;
  family: string;
}

export interface UserProfile {
  pseudo: string;
  comments: CommentsProfile[] | null;
  cocktails: CocktailsProfile[] | null;
}

export interface UserProfileProps {
  pseudo: string;
}

export interface CommentsSectionProfileProps {
  comments: CommentsProfile[] | null;
}
export interface CommentsProfileProps {
  comments: CommentsProfile[];
}

export interface CocktailProfileProps {
  cocktails: CocktailsProfile[];
}

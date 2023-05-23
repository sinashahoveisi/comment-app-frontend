export interface CommentProps {
  id: number;
  body: string;
  is_pined: boolean;
  likes: number;
  created_at: string;
}

export interface CommentFormProps {
  first_name: string;
  last_name: string;
  email: string;
}

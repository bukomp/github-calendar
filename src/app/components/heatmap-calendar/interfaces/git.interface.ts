export type CommitsPerDay = {
  date: Date;
  amountOfCommits: number;
};

export interface UserEvents {
  id: string;
  type: string | 'PushEvent';
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: GitCommit[];
  };
  public: boolean;
  created_at: string;
}

export interface GitCommit {
  sha: string;
  author: {
    email: string;
    name: string;
  };
  message: string;
  distinct: boolean;
  url: string;
  date?: Date;
}

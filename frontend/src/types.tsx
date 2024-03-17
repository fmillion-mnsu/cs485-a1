// typescript type
export type tProject = {
  id: number;
  project_name: string;
  code_review_completed: boolean;
  is_nda: boolean;
};

export type tNewProject = {
  project_name: string;
  is_nda: boolean;
}

// Global configuration to allow for environment variables to be imported
declare global {
  interface Window {
    // declare env to be a dictionary with strings for both keys and values
    env: { [key: string]: string };
  }
}
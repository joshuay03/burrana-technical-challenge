/**
 * Generic interface for command result
 */
export interface CommandResult {
  error: boolean,
  message: string | null,
};

/**
 * Interface for Book command result
 */
 export interface BookCommandResult extends CommandResult {
  error: boolean,
  message: string | null,
};

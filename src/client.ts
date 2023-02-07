import childProcess from 'child_process';

export const execute = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (error, standardOutput, standardError) => {
      if (error) {
        reject(error);
      }
      else if (standardError) reject(standardError);
      resolve(standardOutput);
    });
  });
}

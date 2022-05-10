import { EmailAuthData } from 'constants/types/types';
import { TFunction } from 'react-i18next';

const checkField = (key: string, value: string, t: TFunction): { next: boolean; problem: Object } => {
  let next = true;
  const problem: { title: string; description: string } = {
    title: '',
    description: '',
  };

  // Check if field is not empty
  if (value.length === 0) {
    next = false;
    problem.title = t(`errors:${key}:emptyTitle`) as string;
    problem.description = t(`errors:${key}:emptyDesc`) as string;

    return { next, problem };
  }

  // Check if it is email field
  if (key === 'email') {
    const emailRegex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    // Check if email is written correctly
    if (!RegExp(emailRegex).test(value)) {
      next = false;
      problem.title = t('errors:email:faulty') as string;
    }
  }

  if (key === 'password' && value.length < 6) {
    next = false;
    problem.title = t('errors:password:faulty') as string;
    problem.description = t('errors:password:shorty') as string;
  }

  return { next, problem };
};

export const validateInputFields = (data: EmailAuthData, t: TFunction): { isValid: boolean; error: Object } => {
  let isValid = true;
  const error: { title: string; description: string } = {
    title: '',
    description: '',
  };

  Object.entries(data).every(([key, value]) => {
    const { next, problem } = checkField(key, value, t);

    if (key === 'repeatedPassword' && value !== data['password']) {
      isValid = false;
      error.title = t('errors:repeatedPassword:faulty') as string;
      return false;
    }

    if (next) {
      return true;
    }
    isValid = next;
    error.title = problem.title;
    error.description = problem.description;
    return false;
  });

  return { isValid, error };
};

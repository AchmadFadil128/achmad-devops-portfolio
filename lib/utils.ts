import type {
  CertificationStatus,
  ProjectStatus,
  WritingStatus,
} from '@/lib/data';

export type Status = ProjectStatus | WritingStatus | CertificationStatus;

export function formatDate(value: string, options?: Intl.DateTimeFormatOptions) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(date);
}

export function statusTone(status: Status) {
  if (status === 'Completed' || status === 'Published' || status === 'Active') {
    return 'status status--positive';
  }

  if (status === 'In Progress' || status === 'Near Expiry') {
    return 'status status--progress';
  }

  if (status === 'Expired' || status === 'Cancelled') {
    return 'status status--negative';
  }

  return 'status status--neutral';
}

export function externalLinkProps(url?: string) {
  if (!url) return {};
  return {
    target: '_blank',
    rel: 'noreferrer',
  } as const;
}

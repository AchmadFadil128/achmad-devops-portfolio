// ─── Types ────────────────────────────────────────────────────────────────────
export type ProjectStatus = 'Planned' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
export type WritingStatus = 'Planned' | 'In Progress' | 'On Hold' | 'Completed' | 'Published';
export type CertificationStatus = 'Active' | 'Near Expiry' | 'Expired';

export interface Project {
  id: string;
  name: string;
  pictureUrl: string;
  shortDescription: string;
  dateCreate: string;
  status: ProjectStatus;
  longDescription: string;
  otherPictures: string[];
  techStack: string[];
  exturlproject?: string;
}

export interface Writing {
  id: string;
  name: string;
  shortDescription: string;
  dateCreate: string;
  status: WritingStatus;
  urlFile: string;
}

export interface Certification {
  id: string;
  name: string;
  status: CertificationStatus;
  pictureUrl: string;
  issuer: string;
  expirationDate: string; // ISO date string
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  year: string;
}

export interface CareerEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface People {
  name: string;
  title: string;
  description: string;
  workingAt: string;
  skills: string[];
  education: Education[];
  carrierPath: CareerEntry[];
  contact: { email: string; github: string; linkedin: string; twitter: string };
  hobbies: string[];
}

// ─── API Config ───────────────────────────────────────────────────────────────
const API_BASE = process.env.API_BASE_URL;

async function apiFetch<T>(path: string): Promise<T> {
  if (!API_BASE) {
    throw new Error('API_BASE_URL is not configured');
  }

  const res = await fetch(`${API_BASE}${path}`, {
    // Next.js 16 cache: revalidate setiap 60 detik
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }

  const json = await res.json();
  return json.data as T;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────
export const people: People = {
  name: 'Achmad Fadil Nur Ramdhani',
  title: 'Junior Cloud Engineer',
  description:
    'Building reliable Kubernetes platforms, observability stacks, and automated infrastructure.',
  workingAt: 'PT Indostorage Solusi Teknologi',
  skills: [
    'Kubernetes',
    'Docker',
    'Linux',
    'Rancher',
    'GitLab CI/CD',
    'Grafana',
    'VictoriaMetrics',
    'Alloy',
    'Nginx',
    'HAProxy',
    'Proxmox',
    'Cloud Computing',
    'Infrastructure Monitoring',
    'DevOps',
    'Bash',
    'Git',
  ],
  education: [
    {
      degree: 'Vocational High School',
      field: 'Computer and Network Engineering',
      institution: 'SMKN 1 Cimahi',
      year: '2023 – 2026',
    },
  ],
  carrierPath: [
    {
      role: 'Cloud Engineering Intern (Vocational Internship)',
      company: 'PT Indostorage Solusi Teknologi',
      period: 'Jul 2025 – Dec 2025',
      description:
        'Learned cloud infrastructure fundamentals, Linux system administration, containerization, monitoring, and high-availability environments. Participated in infrastructure deployment, system monitoring, and operational tasks while gaining hands-on experience with enterprise-grade technologies.',
    },
    {
      role: 'Cloud Engineering Intern',
      company: 'PT Indostorage Solusi Teknologi',
      period: 'Jan 2026 – Jun 2026',
      description:
        'Working with Kubernetes, Rancher, monitoring stacks, virtualization platforms, and cloud infrastructure. Contributing to deployment automation, observability implementations, containerized applications, and internal platform operations while preparing for the Certified Kubernetes Administrator (CKA) certification.',
    },
    {
      role: 'DevOps Engineer',
      company: 'PT Indostorage Solusi Teknologi',
      period: 'Jul 2026 – Present',
      description:
        'Working with Kubernetes, Rancher, monitoring stacks, virtualization platforms, and cloud infrastructure. Contributing to deployment automation, observability implementations, containerized applications, and internal platform operations while preparing for the Certified Kubernetes Administrator (CKA) certification.',
    },
  ],
  contact: {
    email: 'me@achmad128.my.id',
    github: 'https://github.com/AchmadFadil128',
    linkedin: 'https://linkedin.com/in/achmad-fadil-nur-ramdhani/',
    twitter: 'https://x.com/achmad128f',
  },
  hobbies: ['Reading Tech Articles', 'Chess', 'Photography', 'Cycling'],
};

export const projects: Project[] = [
  {
    id: 'portfolio-v3',
    name: 'Portfolio v3',
    pictureUrl: 'https://picsum.photos/seed/porto3/800/450',
    shortDescription:
      'A modern personal portfolio built with Next.js 16, Tailwind CSS v4, and a Go REST API backend.',
    dateCreate: '2026-04-01',
    status: 'In Progress',
    longDescription: `This is the third iteration of my personal portfolio website, built from scratch with Next.js App Router, Tailwind CSS v4, and a Golang REST API for content management.

The project features a clean, documentation-inspired design system modeled after Mintlify — emphasizing readability, generous whitespace, and subtle micro-interactions.

Key features include a flexible data abstraction layer that supports both static dummy data and live API integration, dynamic project/writing/certification pages, and a fully responsive layout.`,
    otherPictures: [
      'https://picsum.photos/seed/porto3b/800/450',
      'https://picsum.photos/seed/porto3c/800/450',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Go', 'PostgreSQL'],
    exturlproject: 'https://achmad128.my.id',
  },
  {
    id: 'inventory-system',
    name: 'Inventory Management System',
    pictureUrl: 'https://picsum.photos/seed/invent1/800/450',
    shortDescription:
      'Full-stack inventory and warehouse management with real-time stock tracking and sales analytics.',
    dateCreate: '2025-10-15',
    status: 'Completed',
    longDescription: `A comprehensive inventory management system for small-to-medium businesses. Provides real-time stock tracking, purchase order management, and detailed sales analytics.

Built with a Go microservices backend and a Next.js admin dashboard. Handles thousands of SKUs with sub-second query performance via strategic PostgreSQL indexing and Redis caching.

Features include barcode scanning integration, automated low-stock alerts, multi-warehouse support, and CSV export for financial reporting.`,
    otherPictures: [
      'https://picsum.photos/seed/invent2/800/450',
      'https://picsum.photos/seed/invent3/800/450',
    ],
    techStack: ['Go', 'PostgreSQL', 'Redis', 'Next.js', 'Docker'],
    exturlproject: 'https://github.com/AchmadFadil128/inventory-system',
  },
  {
    id: 'task-orchestrator',
    name: 'Distributed Task Orchestrator',
    pictureUrl: 'https://picsum.photos/seed/tasks1/800/450',
    shortDescription:
      'Lightweight distributed task queue with priority scheduling, worker pooling, and a real-time monitoring UI.',
    dateCreate: '2025-07-20',
    status: 'Completed',
    longDescription: `A distributed task queue and orchestration system inspired by Celery, built in Go for higher throughput and lower memory footprint.

Supports priority-based scheduling, dead-letter queues, retries with exponential backoff, and a web UI for real-time monitoring.

Worker nodes communicate via gRPC. The control plane uses Redis for task state and PostgreSQL for persistent history.`,
    otherPictures: ['https://picsum.photos/seed/tasks2/800/450'],
    techStack: ['Go', 'gRPC', 'Redis', 'PostgreSQL', 'React'],
    exturlproject: 'https://github.com/AchmadFadil128/task-orchestrator',
  },
  {
    id: 'ml-data-pipeline',
    name: 'ML Data Pipeline',
    pictureUrl: 'https://picsum.photos/seed/pipe1/800/450',
    shortDescription:
      'Automated ETL pipeline for ingesting and preprocessing time-series sensor data for ML model consumption.',
    dateCreate: '2025-03-10',
    status: 'On Hold',
    longDescription: `An automated ETL pipeline designed to ingest and preprocess time-series sensor data for machine learning consumption.

Handles data ingestion from multiple sources (IoT sensors, CSV uploads, API feeds), applies configurable transformation rules, and outputs clean, normalized datasets to an S3-compatible object store.

Currently on hold pending budget approval for the ML training infrastructure.`,
    otherPictures: [
      'https://picsum.photos/seed/pipe2/800/450',
      'https://picsum.photos/seed/pipe3/800/450',
    ],
    techStack: ['Python', 'Go', 'Apache Kafka', 'PostgreSQL', 'MinIO'],
    exturlproject: '',
  },
  {
    id: 'chat-app',
    name: 'Real-Time Chat Application',
    pictureUrl: 'https://picsum.photos/seed/chat1/800/450',
    shortDescription:
      'Scalable real-time chat with WebSocket support, group rooms, and end-to-end message persistence.',
    dateCreate: '2024-11-01',
    status: 'Completed',
    longDescription: `A production-grade real-time chat application supporting thousands of concurrent connections via WebSockets.

Features user authentication (JWT), group rooms, direct messages, message history in PostgreSQL, and file attachment support. Uses a fan-out architecture to broadcast messages efficiently.

The frontend is built with React using a custom WebSocket hook with automatic reconnection.`,
    otherPictures: ['https://picsum.photos/seed/chat2/800/450'],
    techStack: ['Go', 'WebSocket', 'React', 'PostgreSQL', 'JWT'],
    exturlproject: 'https://github.com/AchmadFadil128/chat-app',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway & Rate Limiter',
    pictureUrl: 'https://picsum.photos/seed/gway1/800/450',
    shortDescription:
      'Custom API gateway with JWT auth, token-bucket rate limiting, request routing, and Prometheus metrics.',
    dateCreate: '2025-01-15',
    status: 'Planned',
    longDescription: `A lightweight, high-performance API gateway designed to sit in front of microservices. Handles authentication, authorization, rate limiting, and routing without enterprise overhead.

Uses token-bucket algorithm for rate limiting with per-user and per-endpoint granularity. Prometheus metrics exported for Grafana dashboards.

Currently in the planning phase with architecture design complete.`,
    otherPictures: [],
    techStack: ['Go', 'Redis', 'Prometheus', 'Docker', 'Nginx'],
    exturlproject: '',
  },
];

export const writings: Writing[] = [
  {
    id: 'go-microservices-patterns',
    name: 'Go Microservices Patterns You Should Know',
    shortDescription:
      'A deep dive into battle-tested patterns for building maintainable microservices in Go — from service discovery to circuit breakers.',
    dateCreate: '2026-03-15',
    status: 'Completed',
    urlFile: 'https://medium.com/@achmad/go-microservices-patterns',
  },
  {
    id: 'nextjs-app-router-guide',
    name: 'The Practical Next.js App Router Guide',
    shortDescription:
      'Everything I wish I knew before migrating from Pages Router to App Router — server components, streaming, and the data fetching model explained.',
    dateCreate: '2026-02-10',
    status: 'Completed',
    urlFile: 'https://medium.com/@achmad/nextjs-app-router',
  },
  {
    id: 'postgresql-indexing',
    name: 'PostgreSQL Indexing Strategies for High-Traffic Apps',
    shortDescription:
      'Practical indexing strategies that reduced query times by 80% in production — B-tree, GIN, partial indexes, and EXPLAIN ANALYZE.',
    dateCreate: '2026-01-20',
    status: 'Completed',
    urlFile: 'https://medium.com/@achmad/pg-indexing',
  },
  {
    id: 'docker-compose-patterns',
    name: 'Docker Compose Patterns for Local Development',
    shortDescription:
      'How to structure Docker Compose for complex multi-service local environments without losing your mind.',
    dateCreate: '2025-12-05',
    status: 'Completed',
    urlFile: 'https://medium.com/@achmad/docker-compose-patterns',
  },
  {
    id: 'grpc-vs-rest',
    name: 'gRPC vs REST: When to Use Which',
    shortDescription:
      'A pragmatic comparison of gRPC and REST APIs — performance benchmarks, developer experience, and real-world trade-offs.',
    dateCreate: '2025-10-30',
    status: 'Completed',
    urlFile: 'https://medium.com/@achmad/grpc-vs-rest',
  },
  {
    id: 'react-state-deep-dive',
    name: 'React State Management: A 2025 Deep Dive',
    shortDescription:
      'Comparing useState, useReducer, Zustand, and React Query — and how to pick the right tool for your project.',
    dateCreate: '2025-09-12',
    status: 'In Progress',
    urlFile: '',
  },
];

export const certifications: Certification[] = [
  {
    id: 'aws-saa',
    name: 'AWS Certified Solutions Architect – Associate',
    status: 'Active',
    pictureUrl: 'https://picsum.photos/seed/aws1/400/280',
    issuer: 'Amazon Web Services',
    expirationDate: '2027-06-01',
  },
  {
    id: 'cka',
    name: 'Certified Kubernetes Administrator (CKA)',
    status: 'Active',
    pictureUrl: 'https://picsum.photos/seed/cka1/400/280',
    issuer: 'Cloud Native Computing Foundation',
    expirationDate: '2027-09-01',
  },
  {
    id: 'google-associate',
    name: 'Google Associate Cloud Engineer',
    status: 'Near Expiry',
    pictureUrl: 'https://picsum.photos/seed/gcp1/400/280',
    issuer: 'Google Cloud',
    expirationDate: '2026-08-15',
  },
  {
    id: 'go-cert',
    name: 'Go Programming Language Professional',
    status: 'Active',
    pictureUrl: 'https://picsum.photos/seed/gopl/400/280',
    issuer: 'The Go Authors',
    expirationDate: '2028-01-01',
  },
  {
    id: 'postgresql-cert',
    name: 'PostgreSQL Professional Certification',
    status: 'Expired',
    pictureUrl: 'https://picsum.photos/seed/pgcert/400/280',
    issuer: 'PostgreSQL Global Development Group',
    expirationDate: '2024-12-31',
  },
  {
    id: 'docker-cert',
    name: 'Docker Certified Associate',
    status: 'Active',
    pictureUrl: 'https://picsum.photos/seed/dkrcert/400/280',
    issuer: 'Docker, Inc.',
    expirationDate: '2027-03-01',
  },
];

// ─── Service Functions (REST API) ────────────────────────────────────────────

export async function getPeople(): Promise<People> {
  // People bersifat hardcoded — tidak dari API
  return people;
}

export async function getProjects(): Promise<Project[]> {
  if (!API_BASE) return projects;

  try {
    return await apiFetch<Project[]>('/api/projects');
  } catch (err) {
    console.error('[getProjects] Falling back to dummy data:', err);
    return projects; // fallback ke dummy data saat API tidak tersedia
  }
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  if (!API_BASE) return projects.find((project) => project.id === id);

  try {
    return await apiFetch<Project>(`/api/projects/${id}`);
  } catch (err) {
    console.error(`[getProjectById] ${id}:`, err);
    return projects.find((project) => project.id === id);
  }
}

export async function getWritings(): Promise<Writing[]> {
  if (!API_BASE) return writings;

  try {
    return await apiFetch<Writing[]>('/api/writings');
  } catch (err) {
    console.error('[getWritings] Falling back to dummy data:', err);
    return writings;
  }
}

export async function getWritingById(id: string): Promise<Writing | undefined> {
  if (!API_BASE) return writings.find((writing) => writing.id === id);

  try {
    return await apiFetch<Writing>(`/api/writings/${id}`);
  } catch (err) {
    console.error(`[getWritingById] ${id}:`, err);
    return writings.find((writing) => writing.id === id);
  }
}

export async function getCertifications(): Promise<Certification[]> {
  if (!API_BASE) return certifications;

  try {
    return await apiFetch<Certification[]>('/api/certifications');
  } catch (err) {
    console.error('[getCertifications] Falling back to dummy data:', err);
    return certifications;
  }
}

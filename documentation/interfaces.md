interface Book {
  id: number;
  title: string;
  author: string;
  pages?: number; -> optional
  markDamaged: (reason: string) => void
}


interfaces for function types
methods in interfaces and how to use them
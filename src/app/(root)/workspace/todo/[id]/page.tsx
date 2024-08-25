import { TodoUI } from '@/views/todo';

export default async function ({ params }: { params: { id: string } }) {
  return <TodoUI todoId={params.id} />;
}

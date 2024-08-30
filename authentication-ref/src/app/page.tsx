import TaskCalendar from "@/components/TaskCalendar";
import TestClient from "@/components/TestClient";
import getSession from "@/server_actions/getSession";

export default async function Home() {
  const role = (await getSession()).getRole();
  return (
    <div className="flex flex-col h-full">
      { role === 'STUDENT' && <div className="text-sm text-green-700">Student</div> }
      { role === 'MENTOR' && <div className="text-sm text-green-700">Mentor</div> }
      { role === 'SUPERADMIN' && <div className="text-sm text-green-700">Super Admin</div> }
      <TestClient />
      <TaskCalendar />
    </div>
  );
}

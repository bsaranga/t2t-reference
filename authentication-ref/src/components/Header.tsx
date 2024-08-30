import { Button } from "./ui/button"

export default function Header() {
    return (
        <div className="flex gap-2 justify-between items-center py-2 px-4 shadow-md mb-4">
            <div className="text-lg font-bold">T2T Digital Log Book</div>
            <form action="/auth/logout" method="post">
            <Button type="submit">Logout</Button>
            </form>
        </div>
    )
}
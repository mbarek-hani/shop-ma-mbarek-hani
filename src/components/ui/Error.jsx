import { Button } from "@/components";

function Error({ retry = null, children }) {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between bg-red-100 border-2 border-red-300 rounded-lg px-8 py-4">
      {children}
      {retry && <Button onClick={retry}>Retry</Button>}
    </div>
  );
}

export default Error;

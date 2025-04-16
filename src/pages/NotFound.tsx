
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <Flag className="h-16 w-16 text-primary mb-6" />
      <h1 className="text-4xl font-bold mb-2 text-foreground">404</h1>
      <p className="text-xl text-soft-grey mb-6">Oops! That page is out of bounds</p>
      <Button asChild className="rounded-2xl">
        <a href="/dashboard">Back to the Clubhouse</a>
      </Button>
    </div>
  );
};

export default NotFound;

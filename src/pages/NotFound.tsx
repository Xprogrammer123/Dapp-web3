
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center glass-card p-12 max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-web3-primary">404</h1>
        <p className="text-xl text-gray-300 mb-6">Page Not Found</p>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-web3-primary hover:bg-web3-secondary"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

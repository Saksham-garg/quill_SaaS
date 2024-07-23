"use client"
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser()
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="h-14 flex items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            Quill
          </Link>

          <div className="hidden items-center sm:flex space-x-4">
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Pricing
            </Link>
            <ClerkLoading>
                <div className="flex gap-4 items-center justify-center">
                    <div className="h-6 w-12 rounded" style={{ background: `linear-gradient(90deg, #F1EFEF -${24.18}%, #F9F8F8 ${50.26}%, #E7E5E5 ${114.84}%)` }}>
                    </div>
                    <div className="h-8 w-8 rounded-full" style={{ background: `linear-gradient(90deg, #F1EFEF -${24.18}%, #F9F8F8 ${50.26}%, #E7E5E5 ${114.84}%)` }}>
                    </div>
                </div>
            </ClerkLoading>
            <ClerkLoaded>
                { 
                  !user &&
                    <Link href='/sign-in'>
                      <Button className={buttonVariants({ variant: "ghost", size: "sm" })} >
                        Sign in
                      </Button>
                    </Link>
                }
                <UserButton afterSwitchSessionUrl="/"></UserButton>
            </ClerkLoaded>
          </div>    
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;

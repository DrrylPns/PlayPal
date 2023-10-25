"use client"
import Link from 'next/link'
import React from 'react'
import { ToggleMode } from '../ToggleMode'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';
import { cn } from '@/libs/utils';
import Logo from '../ui/Logo'

const Navbar = () => {
    let session = false;

  return (
    <nav className='flex justify-around p-2 border-b items-center max-sm:justify-between max-sm:px-11'>
        <div className='flex flex-row gap-11 items-center'>
            <Logo />
            
            {/* <div className='flex gap-4 text-zinc-500 items-center max-sm:hidden'> */}
                {/* <Link href={"/blog"} className='hover:text-zinc-800 dark:hover:text-zinc-300'>Blog</Link>
                <Link href={"/support"} className='hover:text-zinc-800 dark:hover:text-zinc-300'>Support</Link> */}
                <NavigationMenu className='flex gap-4 text-zinc-500 items-center max-sm:hidden'>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Blog</NavigationMenuTrigger>

                            <NavigationMenuContent>
                                <NavigationMenuLink href={"/news"} className='flex flex-col gap-1 w-[300px] p-4 lg:w-[300px] hover:bg-accent hover:text-accent-foreground rounded-md text-sm'>
                                        News
                                        <p className='text-sm leading-tight text-muted-foreground'>Be updated to our latest news and events!</p>
                                    </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        
                        <NavigationMenuItem>  
                            <NavigationMenuTrigger>Support</NavigationMenuTrigger>

                            <NavigationMenuContent>
                                <NavigationMenuLink href={"/about"} className='flex flex-col gap-1 w-[300px] p-4 lg:w-[300px] hover:bg-accent hover:text-accent-foreground rounded-md text-sm'>
                                    About us
                                    <p className='text-sm leading-tight text-muted-foreground'>Get to know more about us and the platform!</p>
                                </NavigationMenuLink>

                                <NavigationMenuLink href={"/terms"} className='flex flex-col gap-1 w-[300px] p-4 lg:w-[300px] hover:bg-accent hover:text-accent-foreground rounded-md text-sm'>
                                    Terms and Conditions
                                    <p className='text-sm leading-tight text-muted-foreground'>Learn the terms and conditions of our company</p>
                                </NavigationMenuLink>

                                <NavigationMenuLink href={"/contact"} className='flex flex-col gap-1 w-[300px] p-4 lg:w-[300px] hover:bg-accent hover:text-accent-foreground rounded-md text-sm'>
                                    Contact Us
                                    <p className='text-sm leading-tight text-muted-foreground'>Reach out to our 24/7 customer service for support!</p>
                                </NavigationMenuLink>
                            </NavigationMenuContent>

                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            {/* </div> */}
        </div>

        <div className='flex items-center gap-5 '>
            <div className='hidden sm:block'>
                <ToggleMode />
            </div>

            {/* if logged in avatar dropdown */}
            {session ? (
                <>
                    {/* <Avatar /> */}
                    Avatar
                </>
            )
            :
            (
                <>
                    <Button>Login</Button>
                </>
            )
        }
        </div>

        {/* burger in the future for mobile experience, they can't see dark mode, blog and support START AT sm: when implementing the burger */}
        {/* <div className='sm:hidden'>
            <Menu />
        </div> */}
    </nav>
  )
}

export default Navbar
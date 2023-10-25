"use client"
import { cn } from '@/libs/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { buttonVariants } from '../ui/button'
import Logo from '../ui/Logo'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

const Sidebar = ({className, items, ...props}: SidebarProps) => {
    const pathname = usePathname()

  return (
    <nav className={cn(
        "flex gap-1 space-x-2 md:flex-col md:space-x-0 md:space-y-1 my-10 px-5",
        className
    )}
    {...props}
    >
        <div className='flex flex-col'>
                <div className='mb-3'>
                <Logo />
            </div>

            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({variant: 'ghost'}),
                        pathname === item.href ? "bg-muted hover:bg-muted transition-all ease-in-out delay-150" : "hover:underline hover:bg-muted/50 hover:transition-all hover:ease-in-out hover:delay-150",
                        "justify-start"
                    )}
                >
                    {item.title}
                </Link>
            ))}         
        </div>
    </nav>
  )
}

export default Sidebar
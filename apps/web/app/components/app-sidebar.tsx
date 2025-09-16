'use client';

import React from 'react';
import { ChevronDown, HomeIcon, PackageIcon } from 'lucide-react';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: HomeIcon,
  },
  {
    title: 'Packages',
    url: '#',
    icon: PackageIcon,
  },
];

export default function AppSideBar() {
  return (
    <Sidebar side='left' variant='sidebar'>
      <SidebarHeader className='border-sidebar-border h-16 border-b'></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                Select Project <ChevronDown className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <span>Project A</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Project B</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Project C</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  );
}

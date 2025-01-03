import Logo from '/public/assets/logo.svg';
import { Link } from './partials/Link';
import { LogOut, UserCircle, List } from 'iconoir-react';
import { PlusCircle } from 'phosphor-react';
import { AddLinkModal } from '@/Components/AddLinkModal';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { ActionButton } from '@/Components/ActionButton';

interface DashboardProps {
  links: {
    id: number;
    platform: string;
    url: string;
    name: string;
    photo_url: string;
  }[];
}

export default function Dashboard({ links }: DashboardProps) {
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
console.log(links)
  const csrfToken = (
    document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
  )?.content;

  return (
    <div className="flex flex-col items-center w-full h-screen p-10 bg-background-primary">
      <img src={Logo} />

      <div className="w-full max-w-[50rem] mt-8 flex h-screen flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <h2 className="relative font-black text-heading-small text-content-primary">
              Links
              <span className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-accent-orange"></span>
            </h2>
            <Dialog.Root open={isAddLinkModalOpen}>
              <Dialog.Trigger asChild>
                <button
                  onClick={() => setIsAddLinkModalOpen(true)}
                  className="flex items-center gap-1 font-semibold text-label-medium text-accent-orange"
                >
                  <PlusCircle className="text-accent-orange" size={18} />
                  Add new link
                </button>
              </Dialog.Trigger>
              <AddLinkModal onClose={() => setIsAddLinkModalOpen(false)} />
            </Dialog.Root>
          </div>

          <div className="flex flex-col items-center mt-10">
            {links?.map((link) => {
              return (
                <Link key={link.id} name={link.name} platform={link.platform} url={link.url} photo_url={link.photo_url} />
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-center w-full gap-3 mt-10">
        <ActionButton isActive>
            <List />
            </ActionButton>
          <ActionButton isActive={false}>
            <UserCircle />
            </ActionButton>
          <form action="/logout" method="POST">
            <input type="hidden" name="_token" value={csrfToken} />
            <ActionButton isActive={false}>
              <LogOut />
            </ActionButton>
          </form>
        </div>
      </div>
    </div>
  );
}

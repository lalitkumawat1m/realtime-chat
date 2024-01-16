import { useState } from "react"
import { useGeneralStore } from "../stores/generalStore"
import { useUserStore } from "../stores/userStore"
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';

import {
  IconHome2,
  IconUser,
  IconLogout,
  IconBrandMessenger,
  IconBrandWechat,
  IconLogin,
} from "@tabler/icons-react"
import classes from './NavbarMinimal.module.css';
import { useMutation } from "@apollo/client"
import { LOGOUT_USER } from "../graphql/mutatoins/Logout"


interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
    <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
      <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
    </UnstyledButton>
  </Tooltip>
  )
}
const mockdata = [{ icon: IconBrandWechat, label: "Chatrooms" }]

function Sidebar() {
  const toggleProfileSettingsModal = useGeneralStore(
    (state) => state.toggleProfileSettingsModal
  )
  const [active, setActive] = useState(0)

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ))
  const userId = useUserStore((state) => state.id)
  const user = useUserStore((state) => state)
  const setUser = useUserStore((state) => state.setUser)

  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal)
  const [logoutUser, { loading, error }] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      toggleLoginModal()
    },
  })

  const handleLogout = async () => {
    await logoutUser()
    setUser({
      id: undefined,
      fullname: "",
      avatarUrl: null,
      email: "",
    })
  }

  return (
    <nav className={classes.navbar}>
      <Center>
        <IconBrandMessenger type="mark" size={30} />
      </Center>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {userId && links}
        </Stack>
      </div>
      
        <Stack justify="center" gap={0}>
          {userId && (
            <NavbarLink
              icon={IconUser}
              label={"Profile(" + user.fullname + ")"}
              onClick={toggleProfileSettingsModal}
            />
          )}

          {userId ? (
            <NavbarLink
              icon={IconLogout}
              label="Logout"
              onClick={handleLogout}
            />
          ) : (
            <NavbarLink
              icon={IconLogin}
              label="Login"
              onClick={toggleLoginModal}
            />
          )}
        </Stack>
     
    </nav>
  )
}

export default Sidebar
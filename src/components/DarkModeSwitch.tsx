import {useColorMode, IconButton} from '@chakra-ui/react'
import {SunIcon, MoonIcon} from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const {colorMode, toggleColorMode} = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      aria-label="Toggle Theme"
      variant="ghost"
      onClick={toggleColorMode}
    />
  )
}

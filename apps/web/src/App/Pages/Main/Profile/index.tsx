import { FC, useEffect, useState } from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { useThemeColors } from '../../../../hooks/useThemeColors'
import { useLocalization } from '../../../../hooks/useLocalization.ts'
import { StreamingsTab } from '../../../../components/StreamingsTab'

export const Profile: FC = () => {
  const { secondary } = useThemeColors()
  const { t, d } = useLocalization()
  const [tabIndex, setTabindex] = useState(1)

  const tabs = [
    { id: 1, name: t(d.Profile), isDisabled: true, ClientTab: () => null },
    { id: 2, name: t(d.Streamings), isDisabled: false, ClientTab: StreamingsTab },
  ]

  useEffect(() => {
    const enabledTabIndex = tabs.findIndex(({ isDisabled }) => !isDisabled) || 0
    setTabindex(enabledTabIndex)
  }, [])

  return (
    <Tabs flex={1} index={tabIndex}>
      <TabList bg={secondary}>
        {tabs.map(({ name, isDisabled, id }, i) => (
          <Tab key={id} isDisabled={isDisabled} children={name} onClick={() => setTabindex(i)} />
        ))}
      </TabList>
      <TabPanels>
        {tabs.map(({ ClientTab, id }) => (
          <TabPanel key={id}>
            <ClientTab />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

import { FC, useEffect, useMemo, useState } from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

import { useThemeColors } from '../../../../hooks/useThemeColors'
import { useLocalization } from '../../../../hooks/useLocalization.ts'
import { StreamingsTab } from '../../../../components/StreamingsTab'
import { ProfileTab } from '../../../../components/ProfileTab'

export const Profile: FC = () => {
  const { secondary } = useThemeColors()
  const { t, d } = useLocalization()
  const [tabIndex, setTabindex] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const tabId = +(searchParams.get('tab') || 0)

  const tabs = useMemo(
    () => [
      { id: 0, name: t(d.Profile), ClientTab: ProfileTab },
      { id: 1, name: t(d.Streamings), ClientTab: StreamingsTab },
    ],
    [d.Profile, d.Streamings, t],
  )

  useEffect(() => {
    tabId && tabs[tabId] && setTabindex(tabId)
  }, [tabId, tabs])

  const handleSetTab = (index: number) => {
    setSearchParams('')
    setTabindex(index)
  }

  return (
    <Tabs flex={1} index={tabIndex}>
      <TabList bg={secondary}>
        {tabs.map(({ name, id }, i) => (
          <Tab key={id} children={name} onClick={() => handleSetTab(i)} />
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

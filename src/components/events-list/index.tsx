'use client'

import { useMemo, useState } from 'react'

import { PageHeader } from '@/components/page-header'
import { SearchField } from '@/components/search-field'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'
import { useEvents } from '@/hooks/use-events'

import {
  EmptyState,
  ErrorState,
  EventCards,
  EventTable,
  ListSkeleton,
  type SortDir,
  SortToggle,
  StatusFilter,
  type StatusFilterValue,
} from './parts'

export function EventsList() {
  const { data: events, isLoading, isError, refetch } = useEvents()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilterValue>('all')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const debouncedSearch = useDebounce(search)

  const filtered = useMemo(() => {
    if (!events) return []
    const term = debouncedSearch.trim().toLowerCase()
    return events
      .filter((event) => (status === 'all' ? true : event.status === status))
      .filter((event) =>
        term ? event.name.toLowerCase().includes(term) : true,
      )
      .sort((a, b) => {
        const diff = new Date(a.date).getTime() - new Date(b.date).getTime()
        return sortDir === 'asc' ? diff : -diff
      })
  }, [events, status, debouncedSearch, sortDir])

  function renderContent() {
    if (isLoading) return <ListSkeleton />
    if (isError) return <ErrorState onRetry={() => refetch()} />
    if (!events?.length) {
      return (
        <EmptyState
          title="Nenhum evento cadastrado"
          description="Quando houver eventos, eles aparecem aqui."
        />
      )
    }
    if (!filtered.length) {
      return (
        <EmptyState
          title="Nenhum resultado"
          description="Nenhum evento corresponde à busca ou ao filtro."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setSearch('')
                setStatus('all')
              }}
            >
              Limpar filtros
            </Button>
          }
        />
      )
    }
    return (
      <>
        <div className="hidden md:block">
          <EventTable events={filtered} />
        </div>
        <div className="md:hidden">
          <EventCards events={filtered} />
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Eventos"
        actions={
          <>
            <SearchField
              placeholder="Buscar por nome"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              containerClassName="w-full sm:w-64"
            />
            <SortToggle
              dir={sortDir}
              onToggle={() =>
                setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'))
              }
            />
          </>
        }
      />

      <StatusFilter value={status} onChange={setStatus} />

      {renderContent()}
    </div>
  )
}

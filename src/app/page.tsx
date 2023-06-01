'use client'
import { ChangeEvent, useCallback, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { CgHeart, CgTrash } from 'react-icons/cg'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { TbHeartFilled } from 'react-icons/tb'

interface tasksProps {
  id: number
  name: string
  favorite: boolean
  editing: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<tasksProps[]>([])
  const [taskName, setTaskName] = useState('')
  const [editingTaskName, setEditingTaskName] = useState('')
  const [error, setError] = useState('')

  const handleTaskNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTaskName(e.target.value)
    },
    []
  )

  const addTask = useCallback(() => {
    if (taskName == '') {
      setError('border-red-500')

      return false
    }

    const newTask = {
      id: Math.floor(Math.random() * 1000),
      name: taskName,
      favorite: false,
      editing: false,
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
    setError('')
    setTaskName('')
  }, [taskName])

  const removeTask = useCallback(
    (id: number) => {
      const newTask = tasks.filter((task) => {
        return task.id !== id
      })

      setTasks(newTask)
    },
    [tasks]
  )

  const handleTaskFavorite = useCallback(
    (id: number) => {
      const newTask = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, favorite: !task.favorite }
        }

        return task
      })
      setTasks(newTask)
    },
    [tasks]
  )

  const handleEditing = useCallback(
    (id: number) => {
      const newTask = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, editing: !task.editing }
        } else {
          return { ...task, editing: false }
        }
      })

      setTasks(newTask)

      const taskToEdit = tasks.find((task) => task.id === id)
      if (taskToEdit) setEditingTaskName(taskToEdit.name)
    },
    [tasks]
  )

  const handleEditingTaskNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEditingTaskName(e.target.value)
    },
    []
  )

  const handleEditTaskName = useCallback(
    (id: number) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return { ...task, name: editingTaskName, editing: false }
          }

          return task
        })
      )
    },
    [tasks, editingTaskName]
  )

  return (
    <div className="p-4">
      <h1 className="mb-1">Criar lista de tarefas</h1>
      <div>
        <input
          className={`border border-black outline-none rounded-md pl-3 ${error}`}
          value={taskName}
          onChange={(e) => handleTaskNameChange(e)}
          name="taskName"
          type="text"
        />
        <button
          type="button"
          className="rounded-full bg-slate-900 text-white px-6 ml-4"
          onClick={addTask}
        >
          Criar
        </button>
      </div>
      <div className="mt-4">
        {tasks.length === 0 ? (
          <div>
            <h1>Nenhuma tarefa adicionada!</h1>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-4">
              {task.editing ? (
                <button onClick={() => handleEditTaskName(task.id)}>
                  <AiOutlineCheck />
                </button>
              ) : (
                <button onClick={() => handleEditing(task.id)}>
                  <MdOutlineModeEditOutline />
                </button>
              )}

              {task.editing ? (
                <div className="flex-1">
                  <input
                    type="text"
                    className={`border border-black outline-none rounded-md pl-3`}
                    value={editingTaskName}
                    onChange={(e) => handleEditingTaskNameChange(e)}
                  />
                </div>
              ) : (
                <span className="flex-1">{task.name}</span>
              )}

              <button
                className="flex-1"
                onClick={() => handleTaskFavorite(task.id)}
              >
                {task.favorite ? <TbHeartFilled /> : <CgHeart />}
              </button>

              <button className="flex-1" onClick={() => removeTask(task.id)}>
                <CgTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '../../context/AuthContext'

import { LoginContainer, LoginForm, SubmitButtonLogin } from './styles'
import { toast } from 'react-toastify'

const newLoginFormValidationSchema = zod.object({
  login: zod.string().min(5, 'Informe um usuário válido'),
  password: zod.string(),
})

type NewLoginFormData = zod.infer<typeof newLoginFormValidationSchema>

export function Login() {
  const authLogin = useContextSelector(AuthContext, (context) => {
    return context.authLogin
  })
  
  const { register, handleSubmit, watch, reset } = useForm<NewLoginFormData>({
    resolver: zodResolver(newLoginFormValidationSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  async function handleLogin(data: NewLoginFormData) {
    try {
      await authLogin(data)
      reset()
    } catch (error) {
      toast.error('Erro ao fazer login')
    }
  }

  const userButton = watch('login')
  const isSubmitDisabled = !userButton

  return (
    <LoginContainer>
      <div>
        <h1>InfoPlantas</h1>
        <LoginForm onSubmit={handleSubmit(handleLogin)} action="">
          <input
            type="text"
            placeholder="Insira seu usuário"
            {...register('login')}
          />
          <input
            type="password"
            placeholder="Insira sua Senha"
            {...register('password')}
          />
          <SubmitButtonLogin disabled={isSubmitDisabled} type="submit">
            SIGN UP
          </SubmitButtonLogin>
        </LoginForm>
      </div>
    </LoginContainer>
  )
}

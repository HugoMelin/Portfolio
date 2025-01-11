<script lang="ts" setup>
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const isSubmitting = ref(false)

const schema = yup.object({
  name: yup
    .string()
    .required('Le nom est requis.')
    .min(3, 'Le nom doit comporter au moins 3 caractères.'),
  email: yup
    .string()
    .required("L'email est requis.")
    .email('Veuillez entrer une adresse email valide.')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Veuillez entrer une adresse email valide.',
    ),
  message: yup
    .string()
    .required('Le message est requis.')
    .min(10, 'Le message doit comporter au moins 10 caractères.'),
})

const data = ref({
  service_id: 'service_iaromaw',
  template_id: 'template_jhvks4r',
  user_id: 'uwTGqWk7A9XbDFeUR',
  template_params: {
    name: '',
    email: '',
    message: '',
  },
})

const onSubmit = (values) => {
  isSubmitting.value = true
  setTimeout(async () => {
    console.log(values)
    data.value.template_params.name = values.name
    data.value.template_params.email = values.email
    data.value.template_params.message = values.message
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.value),
      })
      if (!response.ok) {
        throw new Error('Failed to send email')
      }
      isSubmitting.value = false
      showToast('Merci pour votre message. Je vous répondrai le plus tôt possible.', 'success')
      const form = document.getElementById('contact-form')
      if (form) {
        ;(form as HTMLFormElement).reset()
      }
    } catch (error) {
      isSubmitting.value = false
      showToast("Erreur lors de l'envoi du message. Veuillez réessayer.", 'error')
      console.error(error)
    }
  }, 2000)
}

const showToast = (message: string, type: 'success' | 'error') => {
  const toast = document.getElementById('toast')
  if (toast) {
    toast.textContent = message
    toast.className = `toast ${type} show`
    setTimeout(() => {
      toast.className = toast.className.replace('show', '')
    }, 3000)
  }
}
</script>

<template>
  <section class="contact">
    <h3>Travaillons ensemble !</h3>
    <div class="form-container">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" id="contact-form">
        <div class="form-fields">
          <div class="form-field">
            <label for="name">Nom</label>
            <Field name="name" v-slot="{ field }">
              <input v-bind="field" type="text" id="name" placeholder="Votre nom" />
            </Field>
            <span class="error">{{ errors.name }}</span>
          </div>

          <div class="form-field">
            <label for="email">Email</label>
            <Field name="email" v-slot="{ field }">
              <input v-bind="field" type="email" id="email" placeholder="Votre email" />
            </Field>
            <span class="error">{{ errors.email }}</span>
          </div>

          <div class="form-field">
            <label for="message">Message</label>
            <Field name="message" v-slot="{ field }">
              <textarea v-bind="field" id="message" rows="5" placeholder="Votre message"></textarea>
            </Field>
            <span class="error">{{ errors.message }}</span>
          </div>

          <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Envoi...' : 'Envoyer un message' }}
          </button>
        </div>
      </Form>
    </div>
    <div id="toast" class="toast">
      Merci pour votre message. Je vous répondrai le plus tôt possible.
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-bottom: 24px;
}

h3 {
  text-align: center;
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  text-align: start;
}

input,
textarea {
  padding: 0.5rem;
  background-color: var(--background-card);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 0.25rem;
}

textarea {
  resize: vertical;
}

button {
  padding: 0.75rem;
  background-color: var(--text-color);
  color: var(--background-color);
  border: none;
  border-radius: var(--border-radius);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  transition: color 0.3s;
}

button:hover:not(:disabled) {
  background-color: var(--hover-color);
  color: var(--text-color);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #dc3645;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.toast {
  visibility: hidden;
  min-width: 250px;
  max-width: 50vw;
  margin-left: -125px;
  color: var(--text-color);
  text-align: center;
  border-radius: 4px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  right: 2rem;
  top: 24px;
}

.toast.show {
  visibility: visible;
  -webkit-animation:
    fadein 0.5s,
    fadeout 0.5s 2.5s;
  animation:
    fadein 0.5s,
    fadeout 0.5s 2.5s;
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #dc3645;
}
</style>

import { contacts } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="page-footer">
      © {contacts.years} {contacts.org} · {contacts.email} · {contacts.phone}
    </footer>
  )
}

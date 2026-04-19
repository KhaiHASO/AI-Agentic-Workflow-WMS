import { faker } from "@faker-js/faker";

export const todos = [
  {
    id: faker.string.uuid(),
    image: [
      {
        image: "",
        label: "Mahedi Amin",
        value: "mahedi",
      },
      {
        image: "",
        label: "Sovo Haldar",
        value: "sovo",
      },
      {
        image: "",
        label: "Rakibul Islam",
        value: "rakibul",
      },
    ],
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    isDone: false,
    isfav: false,
    isTrash: false,
    category: [
      {
        value: "team",
        label: "team",
      }
    ]
  },
  {
    id: faker.string.uuid(),
    image: [
      {
        image:  "",
        label: "Rakibul Islam",
        value: "rakibul",
      }
    ],
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    isDone: false,
    isfav: true,
    isTrash: false,
    category: [
      {
        value: "low",
        label: "low",
      }
    ]
  },
  {
    id: faker.string.uuid(),
    image: [
      {
        image: "",
        label: "Sovo Haldar",
        value: "sovo",
      },
      {
        image: "",
        label: "Rakibul Islam",
        value: "rakibul",
      },
    ],
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    isDone: true,
    isfav: true,
    isTrash: false,
    category: [
      {
        value: "medium",
        label: "medium",
      },
      {
        value: "low",
        label: "low",
      }
    ]
  },
  {
    id:faker.string.uuid(),
    image: [
      {
        image:  "",
        label: "Mahedi Amin",
        value: "mahedi",
      },
      {
        image: "",
        label: "Sovo Haldar",
        value: "sovo",
      },
      {
        image: "",
        label: "Rakibul Islam",
        value: "rakibul",
      }
    ],
    title: "illo expedita consequatur quia in",
    isDone: false,
    isfav: false,
    isTrash: false,
    category: [
      {
        value: "high",
        label: "high",
      },
      {
        value: "low",
        label: "low",
      }
    ]
  },
  {
    id:faker.string.uuid(),
    image: [
      {
        image:  "",
        label: "Rakibul Islam",
        value: "rakibul",
      },
    ],
    title: "illo expedita consequatur quia in",
    isDone: false,
    isfav: false,
    isTrash: false,
    category: [
      {
        value: "update",
        label: "update",
      }
    ]
  }
]







export type Todo =  ( typeof todos)[number]

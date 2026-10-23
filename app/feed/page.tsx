'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  text: string;
}

interface MessageItem {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface ChatThread {
  id: string;
  contactName: string;
  contactAvatar: string;
  messages: MessageItem[];
}

interface Post {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  imageUrl: string;
  likesCount: number;
  sharesCount: number;
  caption: string;
  isLiked?: boolean;
  isSaved?: boolean;
  commentsList: Comment[];
  chatThreads?: ChatThread[];
}

const defaultPosts: Post[] = [
  {
    id: '1',
    authorName: 'Hastie Koe',
    authorUsername: 'hastiekoe',
    authorAvatar: '/post.png',
    imageUrl: '/post1.png',
    likesCount: 20,
    sharesCount: 20,
    caption:
      'Creating unforgettable moments with my favorite person! 📸✨ Every laugh, every little adventure feels like magic.',
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 'c1',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '1 Minute Ago',
        text: 'This is the kind of love everyone dreams about ✨',
      },
      {
        id: 'c2',
        authorName: 'David Collins',
        authorAvatar: '/David Collins.png',
        timeAgo: '5 Minutes Ago',
        text: 'Vibe fotonya keren banget kak! 😍',
      },
      {
        id: 'c3',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '10 Minutes Ago',
        text: 'Aesthetic abis, tempatnya di mana tuh?',
      },
      {
        id: 'c4',
        authorName: 'John Doe',
        authorAvatar: '/johndoe.png',
        timeAgo: '15 Minutes Ago',
        text: 'Semoga bahagiiiia selalu yaaa ✨',
      },
      {
        id: 'c5',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '20 Minutes Ago',
        text: 'Kapan-kapan ajak aku dong keliling ke sana 🥐',
      },
      {
        id: 'c6',
        authorName: 'David Collins',
        authorAvatar: '/David Collins.png',
        timeAgo: '25 Minutes Ago',
        text: 'Spill filter atau tone yang dipake dong kak!',
      },
      {
        id: 'c7',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '30 Minutes Ago',
        text: 'Maju terus konten-konten kerennya! 🔥',
      },
    ],
    chatThreads: [
      {
        id: 't1',
        contactName: 'David Collins',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm1',
            sender: 'David Collins',
            text: 'Halo Hastie! Momen foto ini aesthetic banget ya, spill lokasinya dong! ✨',
            time: '10:00',
            isMe: false,
          },
        ],
      },
      {
        id: 't2',
        contactName: 'Sarah Thompson',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm2',
            sender: 'Sarah Thompson',
            text: 'Haiii! Suka banget sama tone warnanya, pke filter apa nih? 😍',
            time: '11:15',
            isMe: false,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    authorName: 'Hastie Koe',
    authorUsername: 'hastiekoe',
    authorAvatar: '/post.png',
    imageUrl: '/post2.png',
    likesCount: 45,
    sharesCount: 8,
    caption:
      'Stargazing under the magical night sky. ✨ Clear mind, warm coffee, and peaceful night vibes.',
    isLiked: true,
    isSaved: true,
    commentsList: [
      {
        id: 'c2_1',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '2 Minutes Ago',
        text: 'Malam yang syahdu banget nih ✨',
      },
      {
        id: 'c2_2',
        authorName: 'John Doe',
        authorAvatar: '/johndoe.png',
        timeAgo: '5 Minutes Ago',
        text: 'Kopi hangat + pemandangan bintang emang kombinasi pas!',
      },
      {
        id: 'c2_3',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '12 Minutes Ago',
        text: 'Indah banget pemandangan malamnya 😍',
      },
      {
        id: 'c2_4',
        authorName: 'David Collins',
        authorAvatar: '/David Collins.png',
        timeAgo: '18 Minutes Ago',
        text: 'Bintangnya kelihatan jelas banget yaa!',
      },
      {
        id: 'c2_5',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '25 Minutes Ago',
        text: 'Kamera hp atau kamera pro nih yang buat ambil gambarnya?',
      },
      {
        id: 'c2_6',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '35 Minutes Ago',
        text: 'Pengen banget meratapi malam sambil ngopi gini ☕',
      },
      {
        id: 'c2_7',
        authorName: 'John Doe',
        authorAvatar: '/johndoe.png',
        timeAgo: '40 Minutes Ago',
        text: 'Top bgt emang vibes fotonya 🌙',
      },
    ],
    chatThreads: [
      {
        id: 't2_1',
        contactName: 'David Collins',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm2_1',
            sender: 'David Collins',
            text: 'Vibe fotonya tenang banget kak!',
            time: '21:30',
            isMe: false,
          },
        ],
      },
      {
        id: 't2_2',
        contactName: 'Sarah Thompson',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm2_2',
            sender: 'Sarah Thompson',
            text: 'Suka banget sama pencahayaan bintangnya ✨',
            time: '21:35',
            isMe: false,
          },
        ],
      },
      {
        id: 't2_3',
        contactName: 'Michael Anderson',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm2_3',
            sender: 'Michael Anderson',
            text: 'Keren banget postingannya!',
            time: '21:40',
            isMe: false,
          },
        ],
      },
      {
        id: 't2_4',
        contactName: 'John Doe',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm2_4',
            sender: 'John Doe',
            text: 'Pemandangan malamnya dapet banget feel-nya bro!',
            time: '21:45',
            isMe: false,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    authorName: 'Hastie Koe',
    authorUsername: 'hastiekoe',
    authorAvatar: '/post.png',
    imageUrl: '/post3.png',
    likesCount: 34,
    sharesCount: 3,
    caption:
      'Enjoying a cozy afternoon with warm pastries and hot tea. Simple joys make the best days! 🥐☕',
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 'c3_1',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '1 Minute Ago',
        text: 'Jadi pengen ngopi dan makan kue croissant-nya juga nih! 🥐🤤',
      },
      {
        id: 'c3_2',
        authorName: 'David Collins',
        authorAvatar: '/David Collins.png',
        timeAgo: '3 Minutes Ago',
        text: 'Tampak hangat dan lezat sekali kuenya kak! ✨',
      },
      {
        id: 'c3_3',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '5 Minutes Ago',
        text: 'Kafenya kelihatan sangat nyaman yaa!',
      },
      {
        id: 'c3_4',
        authorName: 'John Doe',
        authorAvatar: '/johndoe.png',
        timeAgo: '8 Minutes Ago',
        text: 'Selamat menikmati sore hari yang santai! ☕',
      },
      {
        id: 'c3_5',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '12 Minutes Ago',
        text: 'Spill nama kafenya dong kak, pengen coba croissant-nya!',
      },
      {
        id: 'c3_6',
        authorName: 'David Collins',
        authorAvatar: '/David Collins.png',
        timeAgo: '15 Minutes Ago',
        text: 'Kombinasi teh hangat + pastry emang paling pas.',
      },
      {
        id: 'c3_7',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '18 Minutes Ago',
        text: 'Foto ini bikin laper di sore hari haha 🥐',
      },
      {
        id: 'c3_8',
        authorName: 'John Doe',
        authorAvatar: '/johndoe.png',
        timeAgo: '22 Minutes Ago',
        text: 'Aesthetic abis tampilan kafenya!',
      },
      {
        id: 'c3_9',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '25 Minutes Ago',
        text: 'Hijab hijaunya serasi banget sama kafe-nya kak! 💚',
      },
      {
        id: 'c3_10',
        authorName: 'David Collins',
        authorAvatar: '/David Collins.png',
        timeAgo: '30 Minutes Ago',
        text: 'Sukses selalu konten kulinernya kak!',
      },
      {
        id: 'c3_11',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '35 Minutes Ago',
        text: 'Next time bikin rekomendasi kafe terbaik dong!',
      },
      {
        id: 'c3_12',
        authorName: 'John Doe',
        authorAvatar: '/johndoe.png',
        timeAgo: '40 Minutes Ago',
        text: 'Vibes sore hari yang tenang dan damai. 🌿',
      },
      {
        id: 'c3_13',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '45 Minutes Ago',
        text: 'Kacamata brown-nya bagus deh, beli di mana?',
      },
      {
        id: 'c3_14',
        authorName: 'David Collins',
        authorAvatar: '/David Collins.png',
        timeAgo: '50 Minutes Ago',
        text: 'Pastry-nya kelihatan masih renyah banget!',
      },
      {
        id: 'c3_15',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '55 Minutes Ago',
        text: 'Enjoy your cozy afternoon kak! ✨☕',
      },
    ],
    chatThreads: [],
  },
  {
    id: '4',
    authorName: 'Hastie Koe',
    authorUsername: 'hastiekoe',
    authorAvatar: '/post.png',
    imageUrl: '/post4.png',
    likesCount: 52,
    sharesCount: 12,
    caption:
      'Chasing sunsets and making memories that will last forever. 🌅 Warm breeze and happy hearts.',
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 'c4_1',
        authorName: 'David Collins',
        authorAvatar: '/David Collins.png',
        timeAgo: '4 Hours Ago',
        text: 'Sunset-nya cantik banget!',
      },
      {
        id: 'c4_2',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '5 Hours Ago',
        text: 'Definisi sore yang sempurna 🌅',
      },
      {
        id: 'c4_3',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '6 Hours Ago',
        text: 'Keren banget pemandangannya!',
      },
      {
        id: 'c4_4',
        authorName: 'John Doe',
        authorAvatar: '/johndoe.png',
        timeAgo: '7 Hours Ago',
        text: 'Mantap sunset-nya',
      },
      {
        id: 'c4_5',
        authorName: 'Clarissa',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '8 Hours Ago',
        text: 'Cantik banget ka',
      },
      {
        id: 'c4_6',
        authorName: 'Rian Pratama',
        authorAvatar: '/David Collins.png',
        timeAgo: '9 Hours Ago',
        text: 'Di pantai mana ini kak?',
      },
      {
        id: 'c4_7',
        authorName: 'Maya Indah',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '10 Hours Ago',
        text: 'Wow amazing view!',
      },
      {
        id: 'c4_8',
        authorName: 'Budi Santoso',
        authorAvatar: '/johndoe.png',
        timeAgo: '11 Hours Ago',
        text: 'Sejuk banget liatnya',
      },
      {
        id: 'c4_9',
        authorName: 'Dina Lestari',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '12 Hours Ago',
        text: 'Suka banget warna langitnya ✨',
      },
    ],
    chatThreads: [
      {
        id: 't4_1',
        contactName: 'David Collins',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm4_1',
            sender: 'David Collins',
            text: 'Sunset yang ini di pantai mana ka?',
            time: '16:45',
            isMe: false,
          },
        ],
      },
    ],
  },
  {
    id: '5',
    authorName: 'Hastie Koe',
    authorUsername: 'hastiekoe',
    authorAvatar: '/post.png',
    imageUrl: '/post5.png',
    likesCount: 68,
    sharesCount: 15,
    caption:
      'Weekend getaway with the best view! Resetting my mind and energy for another productive week. 🍃✨',
    isLiked: true,
    isSaved: false,
    commentsList: [
      {
        id: 'c5_1',
        authorName: 'John Doe',
        authorAvatar: '/johndoe.png',
        timeAgo: 'Yesterday',
        text: 'Happy weekend! Seru banget kumpul keluarganya 🙌',
      },
    ],
    chatThreads: [
      {
        id: 't5_1',
        contactName: 'David Collins',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm5_1',
            sender: 'David Collins',
            text: 'Seru banget bisa kumpul-kumpul ginii!',
            time: '14:00',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_2',
        contactName: 'Sarah Thompson',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm5_2',
            sender: 'Sarah Thompson',
            text: 'Titip salam buat keluarga yaa kak!',
            time: '14:05',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_3',
        contactName: 'Michael Anderson',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm5_3',
            sender: 'Michael Anderson',
            text: 'Momen kehangatannya dapet banget!',
            time: '14:10',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_4',
        contactName: 'John Doe',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm5_4',
            sender: 'John Doe',
            text: 'Kafenya kelihatan cozy abis.',
            time: '14:15',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_5',
        contactName: 'Clarissa',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm5_5',
            sender: 'Clarissa',
            text: 'Wah seru nih weekend getaway-nya ✨',
            time: '14:20',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_6',
        contactName: 'Rian Pratama',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm5_6',
            sender: 'Rian Pratama',
            text: 'Boleh spill lokasi resto/kafenya?',
            time: '14:25',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_7',
        contactName: 'Maya Indah',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm5_7',
            sender: 'Maya Indah',
            text: 'Bagus banget fotonya kak!',
            time: '14:30',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_8',
        contactName: 'Budi Santoso',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm5_8',
            sender: 'Budi Santoso',
            text: 'Sehat dan sukses selalu keluarganya.',
            time: '14:35',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_9',
        contactName: 'Dina Lestari',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm5_9',
            sender: 'Dina Lestari',
            text: 'Seneng liat senyum hangatnya 😍',
            time: '14:40',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_10',
        contactName: 'Andi Wijaya',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm5_10',
            sender: 'Andi Wijaya',
            text: 'Mantaap postingan kumpul-kumpulnya!',
            time: '14:45',
            isMe: false,
          },
        ],
      },
      {
        id: 't5_11',
        contactName: 'Eka Putri',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm5_11',
            sender: 'Eka Putri',
            text: 'Makin hangat suasana kafenya! ✨',
            time: '14:50',
            isMe: false,
          },
        ],
      },
    ],
  },
  {
    id: '6',
    authorName: 'Hastie Koe',
    authorUsername: 'hastiekoe',
    authorAvatar: '/post.png',
    imageUrl: '/post6.png',
    likesCount: 89,
    sharesCount: 24,
    caption:
      'Delicious dinner spread to end the week on a sweet note! Good food equals good mood. 🍕🍝✨',
    isLiked: false,
    isSaved: true,
    commentsList: [
      {
        id: 'c6_1',
        authorName: 'Michael Anderson',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '1 Min Ago',
        text: 'Kelihatannya enak-enak semua makanannya 🍕',
      },
      {
        id: 'c6_2',
        authorName: 'Sarah Thompson',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '2 Min Ago',
        text: 'Wah dinner mewah nih! ✨',
      },
      {
        id: 'c6_3',
        authorName: 'David Collins',
        authorAvatar: '/David Collins.png',
        timeAgo: '5 Min Ago',
        text: 'Mantap banget kuliner malamnya kak!',
      },
      {
        id: 'c6_4',
        authorName: 'John Doe',
        authorAvatar: '/johndoe.png',
        timeAgo: '8 Min Ago',
        text: 'Bikin lapar tengah malam aja nih hehe',
      },
      {
        id: 'c6_5',
        authorName: 'Clarissa',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '10 Min Ago',
        text: 'Spill dong restonya di mana?',
      },
      {
        id: 'c6_6',
        authorName: 'Rian Pratama',
        authorAvatar: '/David Collins.png',
        timeAgo: '12 Min Ago',
        text: 'Top markotop!',
      },
      {
        id: 'c6_7',
        authorName: 'Maya Indah',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '15 Min Ago',
        text: 'Aesthetic banget foto candid-nya.',
      },
      {
        id: 'c6_8',
        authorName: 'Budi Santoso',
        authorAvatar: '/johndoe.png',
        timeAgo: '18 Min Ago',
        text: 'Sehat dan bahagia selalu ya kak!',
      },
      {
        id: 'c6_9',
        authorName: 'Dina Lestari',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '20 Min Ago',
        text: 'Suka banget sama outfit bajunya 🧡',
      },
      {
        id: 'c6_10',
        authorName: 'Andi Wijaya',
        authorAvatar: '/David Collins.png',
        timeAgo: '22 Min Ago',
        text: 'Keren abis potretnya!',
      },
      {
        id: 'c6_11',
        authorName: 'Eka Putri',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '25 Min Ago',
        text: 'Makin bersinar aja nih kak.',
      },
      {
        id: 'c6_12',
        authorName: 'Fajar Nugraha',
        authorAvatar: '/johndoe.png',
        timeAgo: '28 Min Ago',
        text: 'Gaya tumpu tangan di dagu khas banget.',
      },
      {
        id: 'c6_13',
        authorName: 'Dewi Lestari',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '30 Min Ago',
        text: 'Cantik banget kak pakai hijab oranye!',
      },
      {
        id: 'c6_14',
        authorName: 'Ahmad Fauzi',
        authorAvatar: '/David Collins.png',
        timeAgo: '35 Min Ago',
        text: 'Inspirasi OOTD harian nih.',
      },
      {
        id: 'c6_15',
        authorName: 'Siti Rahma',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '40 Min Ago',
        text: 'Kapan-kapan kulineran bareng dong.',
      },
      {
        id: 'c6_16',
        authorName: 'Roni Setiawan',
        authorAvatar: '/johndoe.png',
        timeAgo: '42 Min Ago',
        text: 'Gokil abis fotonya.',
      },
      {
        id: 'c6_17',
        authorName: 'Sri Wahyuni',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '45 Min Ago',
        text: 'Love it so much! ✨',
      },
      {
        id: 'c6_18',
        authorName: 'Hendra Gunawan',
        authorAvatar: '/David Collins.png',
        timeAgo: '48 Min Ago',
        text: 'Keren pol posenya.',
      },
      {
        id: 'c6_19',
        authorName: 'Fitri Handayani',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '50 Min Ago',
        text: 'Sukses terus buat kak Hastie!',
      },
      {
        id: 'c6_20',
        authorName: 'Agus Setiawan',
        authorAvatar: '/johndoe.png',
        timeAgo: '55 Min Ago',
        text: 'Mantap jiwa komentarnya ramaikan.',
      },
      {
        id: 'c6_21',
        authorName: 'Rina Melati',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '1 Hour Ago',
        text: 'Cantik natural banget ka.',
      },
      {
        id: 'c6_22',
        authorName: 'Joko Widodo',
        authorAvatar: '/David Collins.png',
        timeAgo: '1 Hour Ago',
        text: 'Vibes-nya dapet banget.',
      },
      {
        id: 'c6_23',
        authorName: 'Mega Lestari',
        authorAvatar: '/Michael Anderson.png',
        timeAgo: '2 Hours Ago',
        text: 'Keren euy!',
      },
      {
        id: 'c6_24',
        authorName: 'Doni Prasetyo',
        authorAvatar: '/johndoe.png',
        timeAgo: '2 Hours Ago',
        text: 'Keren parah.',
      },
      {
        id: 'c6_25',
        authorName: 'Siska Amelia',
        authorAvatar: '/Sarah Thompson.png',
        timeAgo: '3 Hours Ago',
        text: 'Perfect shot! 🌟',
      },
    ],
    chatThreads: [
      {
        id: 't6_1',
        contactName: 'David Collins',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm6_1',
            sender: 'David Collins',
            text: 'Halo kak, seru banget kelihatannya!',
            time: '12:00',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_2',
        contactName: 'Sarah Thompson',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm6_2',
            sender: 'Sarah Thompson',
            text: 'Makin cantik pakai hijab oranye ✨',
            time: '12:05',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_3',
        contactName: 'Michael Anderson',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm6_3',
            sender: 'Michael Anderson',
            text: 'Boleh minta rekomendasi tempatnya?',
            time: '12:10',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_4',
        contactName: 'John Doe',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm6_4',
            sender: 'John Doe',
            text: 'Keren banget potret terbarunya!',
            time: '12:15',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_5',
        contactName: 'Clarissa',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm6_5',
            sender: 'Clarissa',
            text: 'Wah seru nih weekend-nya',
            time: '12:20',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_6',
        contactName: 'Rian Pratama',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm6_6',
            sender: 'Rian Pratama',
            text: 'Salfok sama bajunya, bagus banget',
            time: '12:25',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_7',
        contactName: 'Maya Indah',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm6_7',
            sender: 'Maya Indah',
            text: 'Halo kak Hastie!',
            time: '12:30',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_8',
        contactName: 'Budi Santoso',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm6_8',
            sender: 'Budi Santoso',
            text: 'Sehat selalu ya kak',
            time: '12:35',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_9',
        contactName: 'Dina Lestari',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm6_9',
            sender: 'Dina Lestari',
            text: 'Keren abis fotonya',
            time: '12:40',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_10',
        contactName: 'Andi Wijaya',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm6_10',
            sender: 'Andi Wijaya',
            text: 'Mantap kak postingannya',
            time: '12:45',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_11',
        contactName: 'Eka Putri',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm6_11',
            sender: 'Eka Putri',
            text: 'Cantik banget kak!',
            time: '12:50',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_12',
        contactName: 'Fajar Nugraha',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm6_12',
            sender: 'Fajar Nugraha',
            text: 'Salam kenal kak',
            time: '13:00',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_13',
        contactName: 'Dewi Lestari',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm6_13',
            sender: 'Dewi Lestari',
            text: 'Wah asyik banget nih',
            time: '13:05',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_14',
        contactName: 'Ahmad Fauzi',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm6_14',
            sender: 'Ahmad Fauzi',
            text: 'Kapan nongkrong bareng lagi?',
            time: '13:10',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_15',
        contactName: 'Siti Rahma',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm6_15',
            sender: 'Siti Rahma',
            text: 'Inspiratif banget kak',
            time: '13:15',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_16',
        contactName: 'Roni Setiawan',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm6_16',
            sender: 'Roni Setiawan',
            text: 'Mantap!',
            time: '13:20',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_17',
        contactName: 'Sri Wahyuni',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm6_17',
            sender: 'Sri Wahyuni',
            text: 'Cantik natural kak',
            time: '13:25',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_18',
        contactName: 'Hendra Gunawan',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm6_18',
            sender: 'Hendra Gunawan',
            text: 'Sukses selalu ya',
            time: '13:30',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_19',
        contactName: 'Fitri Handayani',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm6_19',
            sender: 'Fitri Handayani',
            text: 'Keren pol!',
            time: '13:35',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_20',
        contactName: 'Agus Setiawan',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm6_20',
            sender: 'Agus Setiawan',
            text: 'Halo kak Hastie',
            time: '13:40',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_21',
        contactName: 'Rina Melati',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm6_21',
            sender: 'Rina Melati',
            text: 'Top banget posenya',
            time: '13:45',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_22',
        contactName: 'Joko Widodo',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm6_22',
            sender: 'Joko Widodo',
            text: 'Semangat terus kak!',
            time: '13:50',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_23',
        contactName: 'Mega Lestari',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm6_23',
            sender: 'Mega Lestari',
            text: 'cantik bgt kak',
            time: '13:55',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_24',
        contactName: 'Doni Prasetyo',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm6_24',
            sender: 'Doni Prasetyo',
            text: 'keren abis',
            time: '14:00',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_25',
        contactName: 'Siska Amelia',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm6_25',
            sender: 'Siska Amelia',
            text: 'keren kak fotonya',
            time: '14:05',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_26',
        contactName: 'Bayu Saputra',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm6_26',
            sender: 'Bayu Saputra',
            text: 'Mantap jiwa',
            time: '14:10',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_27',
        contactName: 'Nining Widaningsih',
        contactAvatar: '/Michael Anderson.png',
        messages: [
          {
            id: 'm6_27',
            sender: 'Nining Widaningsih',
            text: 'Cantik banget kak!',
            time: '14:15',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_28',
        contactName: 'Eko Prasetyo',
        contactAvatar: '/johndoe.png',
        messages: [
          {
            id: 'm6_28',
            sender: 'Eko Prasetyo',
            text: 'Hadir kak',
            time: '14:20',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_29',
        contactName: 'Putri Lestari',
        contactAvatar: '/Sarah Thompson.png',
        messages: [
          {
            id: 'm6_29',
            sender: 'Putri Lestari',
            text: 'Keren banget kak ootd-nya',
            time: '14:25',
            isMe: false,
          },
        ],
      },
      {
        id: 't6_30',
        contactName: 'Wahyudi',
        contactAvatar: '/David Collins.png',
        messages: [
          {
            id: 'm6_30',
            sender: 'Wahyudi',
            text: 'Sukses terus ya kak Hastie!',
            time: '14:30',
            isMe: false,
          },
        ],
      },
    ],
  },
];

export default function FeedPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Hastie Koe',
    username: 'hastiekoe',
    avatar: '/post.png',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>(defaultPosts);

  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(
    null
  );
  const [newCommentText, setNewCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [activeMessagePostId, setActiveMessagePostId] = useState<string | null>(
    null
  );
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState('');

  const emojiList = [
    '😀',
    '😅',
    '🥰',
    '😇',
    '🙂',
    '😋',
    '🤪',
    '🤐',
    '😌',
    '🤗',
    '😪',
    '🙄',
    '🤭',
    '😴',
    '😡',
    '😫',
    '😭',
    '😱',
  ];

  useEffect(() => {
    setIsMounted(true);

    const token =
      localStorage.getItem('user_token') ||
      localStorage.getItem('is_logged_in');
    const savedProfile = localStorage.getItem('user_profile');

    if (token || savedProfile) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setUserProfile({
          name: parsed.name || 'Hastie Koe',
          username: parsed.username || 'hastiekoe',
          avatar: '/post.png',
        });
      } catch (e) {
        console.error(e);
      }
    }

    localStorage.setItem('sociality_posts_v6', JSON.stringify(defaultPosts));
    setPosts(defaultPosts);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('sociality_posts_v6', JSON.stringify(posts));
    }
  }, [posts, isMounted]);

  // Fungsi Logout Sempurna
  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('is_logged_in');
    localStorage.removeItem('user_profile');
    setIsLoggedIn(false);
    router.refresh();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      if (query.includes('johndoe') || query === 'john doe') {
        router.push('/profile/johndoe');
      } else {
        alert(`Pencarian untuk "${searchQuery}" tidak ditemukan.`);
      }
    }
  };

  if (!isMounted) {
    return null;
  }

  const activeCommentPost =
    posts.find((p) => p.id === activeCommentPostId) || null;
  const activeMessagePost =
    posts.find((p) => p.id === activeMessagePostId) || null;

  const currentThreads = activeMessagePost?.chatThreads || [];
  const activeThread =
    currentThreads.find((t) => t.id === activeThreadId) ||
    currentThreads[0] ||
    null;

  const handleOpenInbox = (postId: string) => {
    if (!isLoggedIn) {
      alert('Silakan login terlebih dahulu untuk melihat pesan/inbox.');
      router.push('/login');
      return;
    }

    setActiveMessagePostId(postId);
    const post = posts.find((p) => p.id === postId);
    if (post && post.chatThreads && post.chatThreads.length > 0) {
      setActiveThreadId(post.chatThreads[0].id);
    } else {
      setActiveThreadId(null);
    }
  };

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1,
          };
        }
        return post;
      })
    );
  };

  const handleSave = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, isSaved: !post.isSaved } : post
      )
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeCommentPostId) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      authorName: isLoggedIn ? userProfile.name : 'Tamu',
      authorAvatar: '/post.png',
      timeAgo: 'Just now',
      text: newCommentText.trim(),
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === activeCommentPostId) {
          return {
            ...post,
            commentsList: [...(post.commentsList || []), newCommentObj],
          };
        }
        return post;
      })
    );

    setNewCommentText('');
    setShowEmojiPicker(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeMessagePostId || !activeThread) return;

    const newMessageObj: MessageItem = {
      id: Date.now().toString(),
      sender: userProfile.name,
      text: newMessageText.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: true,
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === activeMessagePostId) {
          const updatedThreads = (post.chatThreads || []).map((thread) => {
            if (thread.id === activeThread.id) {
              return {
                ...thread,
                messages: [...thread.messages, newMessageObj],
              };
            }
            return thread;
          });
          return { ...post, chatThreads: updatedThreads };
        }
        return post;
      })
    );

    setNewMessageText('');
  };

  return (
    <div className='min-h-screen bg-[#030206] text-white flex flex-col items-center pb-24 relative'>
      {/* HEADER NAVBAR */}
      <header className='sticky top-0 z-40 w-full bg-[#030206]/90 backdrop-blur-md border-b border-gray-900 px-4 py-3 flex items-center justify-between max-w-5xl'>
        <Link href='/feed' className='flex items-center gap-2'>
          <img
            src='/logo.png'
            alt='Sociality'
            className='h-6 w-auto object-contain'
          />
        </Link>

        {/* Search Input */}
        <div className='relative w-64 md:w-80'>
          <div className='flex items-center w-full bg-[#0b0c10] border border-gray-800 rounded-full px-3.5 py-1.5'>
            <span className='text-gray-400 text-xs mr-2'>🔍</span>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder='Search'
              className='w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none'
            />
          </div>
        </div>

        {/* Header Right */}
        {isLoggedIn ? (
          <div className='flex items-center gap-3'>
            <Link href='/profile' className='flex items-center gap-2 group'>
              <img
                src='/post.png'
                alt={userProfile.name}
                className='w-8 h-8 rounded-full object-cover border border-purple-500/80 group-hover:scale-105 transition'
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/post.png';
                }}
              />
              <span className='hidden sm:inline text-xs font-semibold text-white group-hover:text-purple-400 transition'>
                {userProfile.name}
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className='px-3 py-1 text-[11px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500/20 transition cursor-pointer'
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-3'>
            <Link
              href='/login'
              className='px-4 py-1.5 text-xs font-semibold text-white bg-[#0b0c10] border border-gray-800 rounded-full hover:border-gray-700 transition'
            >
              Login
            </Link>
            <Link
              href='/register'
              className='px-4 py-1.5 text-xs font-semibold text-white bg-[#7c3aed] rounded-full hover:bg-[#6d28d9] transition shadow-lg shadow-purple-600/30'
            >
              Register
            </Link>
          </div>
        )}
      </header>

      {/* MAIN FEED CONTENT */}
      <main className='w-full max-w-md px-3 pt-6 space-y-8'>
        {posts.map((post) => {
          const isExpanded = expandedPostId === post.id;
          const msgCount = post.chatThreads?.length || 0;
          const commentCount = post.commentsList?.length || 0;

          return (
            <div
              key={post.id}
              className='bg-[#030206] border border-gray-900 rounded-3xl p-4 space-y-3 shadow-xl'
            >
              {/* Author Header */}
              <div className='flex items-center gap-3'>
                <img
                  src='/post.png'
                  alt={post.authorName}
                  className='w-10 h-10 rounded-full object-cover border border-gray-800'
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/post.png';
                  }}
                />
                <div>
                  <h3 className='text-xs font-bold text-white'>
                    {post.authorName}
                  </h3>
                  <p className='text-[10px] text-gray-400'>1 Minutes Ago</p>
                </div>
              </div>

              {/* Post Image */}
              <div className='w-full aspect-square rounded-2xl overflow-hidden bg-[#0c0d12] border border-gray-800/80'>
                <img
                  src={post.imageUrl}
                  alt='Post image'
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Action Bar */}
              <div className='flex items-center justify-between pt-1'>
                <div className='flex items-center gap-4 text-xs font-semibold text-white'>
                  <button
                    onClick={() => handleLike(post.id)}
                    className='flex items-center gap-1.5 hover:opacity-80 transition cursor-pointer'
                  >
                    <span
                      className={
                        post.isLiked
                          ? 'text-pink-500 text-sm'
                          : 'text-gray-400 text-sm'
                      }
                    >
                      {post.isLiked ? '❤️' : '🤍'}
                    </span>
                    <span>{post.likesCount}</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveCommentPostId(post.id);
                      setShowEmojiPicker(false);
                    }}
                    className='flex items-center gap-1.5 text-gray-300 hover:text-white transition cursor-pointer'
                  >
                    <span className='text-sm'>💬</span>
                    <span>{commentCount}</span>
                  </button>

                  <button
                    onClick={() => handleOpenInbox(post.id)}
                    className='flex items-center gap-1.5 text-gray-300 hover:text-white transition cursor-pointer group'
                  >
                    <svg
                      className='w-4 h-4 transform -rotate-45 text-gray-300 group-hover:text-white group-hover:scale-110 transition'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 12L3 21l18-9L3 3l3 9zm0 0h7.5'
                      />
                    </svg>
                    <span>{msgCount}</span>
                  </button>
                </div>

                <button
                  onClick={() => handleSave(post.id)}
                  className='text-sm text-gray-300 hover:text-white transition cursor-pointer'
                >
                  {post.isSaved ? '🔖' : '📑'}
                </button>
              </div>

              {/* Caption */}
              <div className='space-y-1 pt-1'>
                <p className='text-xs font-bold text-white'>
                  {post.authorUsername}
                </p>
                <p className='text-xs text-gray-300 leading-relaxed'>
                  {isExpanded
                    ? post.caption
                    : `${post.caption.slice(0, 70)}...`}
                </p>
                {post.caption.length > 70 && (
                  <button
                    onClick={() =>
                      setExpandedPostId(isExpanded ? null : post.id)
                    }
                    className='text-xs font-bold text-[#8b5cf6] hover:underline cursor-pointer'
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </main>

      {/* MODAL COMMENTS */}
      {activeCommentPost && (
        <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6 transition-all'>
          <div className='w-full max-w-4xl bg-[#08090d] border border-gray-800 rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh] md:max-h-[600px] relative'>
            <button
              onClick={() => setActiveCommentPostId(null)}
              className='absolute top-3 right-3 z-30 bg-gray-900/80 hover:bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-gray-700 transition cursor-pointer'
            >
              ✕
            </button>

            <div className='hidden md:block md:w-1/2 bg-black relative'>
              <img
                src={activeCommentPost.imageUrl}
                alt='Post detail'
                className='w-full h-full object-cover'
              />
            </div>

            <div className='w-full md:w-1/2 flex flex-col h-full bg-[#08090d] p-4 md:p-5 relative'>
              <div className='flex items-center gap-3 pb-3 border-b border-gray-800/80'>
                <img
                  src='/post.png'
                  alt={activeCommentPost.authorName}
                  className='w-9 h-9 rounded-full object-cover border border-gray-700'
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/post.png';
                  }}
                />
                <div>
                  <h4 className='text-xs font-bold text-white'>
                    {activeCommentPost.authorName}
                  </h4>
                  <p className='text-[10px] text-gray-400'>1 Minutes Ago</p>
                </div>
              </div>

              <p className='text-xs text-gray-300 py-3 border-b border-gray-800/50 text-ellipsis overflow-hidden'>
                {activeCommentPost.caption}
              </p>

              <h5 className='text-xs font-bold text-white pt-3 pb-2'>
                Comments
              </h5>

              <div className='flex-1 overflow-y-auto space-y-4 pr-1 min-h-[160px] max-h-[260px] md:max-h-[300px]'>
                {(activeCommentPost.commentsList || []).length > 0 ? (
                  activeCommentPost.commentsList.map((comment) => (
                    <div key={comment.id} className='flex gap-3 text-xs'>
                      <img
                        src={comment.authorAvatar}
                        alt={comment.authorName}
                        className='w-8 h-8 rounded-full object-cover border border-gray-800'
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/post.png';
                        }}
                      />
                      <div className='space-y-0.5'>
                        <div className='flex items-center gap-2'>
                          <span className='font-bold text-white text-[11px]'>
                            {comment.authorName}
                          </span>
                          <span className='text-[9px] text-gray-500'>
                            {comment.timeAgo}
                          </span>
                        </div>
                        <p className='text-gray-300 text-[11px] leading-snug'>
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='h-full flex flex-col items-center justify-center text-center space-y-1 py-10'>
                    <p className='text-xs font-bold text-white'>
                      No Comments yet
                    </p>
                    <p className='text-[10px] text-gray-400'>
                      Start the conversation
                    </p>
                  </div>
                )}
              </div>

              {showEmojiPicker && (
                <div className='absolute bottom-16 left-4 bg-[#121318] border border-gray-800 rounded-2xl p-3 shadow-2xl grid grid-cols-6 gap-2 z-40 max-w-[220px]'>
                  {emojiList.map((emoji, idx) => (
                    <button
                      key={idx}
                      type='button'
                      onClick={() => {
                        setNewCommentText((prev) => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className='text-base hover:scale-125 transition cursor-pointer'
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={handleAddComment}
                className='mt-3 pt-2 border-t border-gray-800/80 flex items-center gap-2'
              >
                <button
                  type='button'
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className='w-9 h-9 rounded-xl bg-[#121318] border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white transition text-sm cursor-pointer'
                >
                  😊
                </button>

                <div className='flex-1 flex items-center bg-[#121318] border border-gray-800 rounded-xl px-3 py-1.5 focus-within:border-purple-500 transition'>
                  <input
                    type='text'
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder='Add Comment'
                    className='w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none'
                  />
                  <button
                    type='submit'
                    className='text-xs font-bold text-purple-400 hover:text-purple-300 transition ml-2 cursor-pointer'
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INBOX MULTI-USER */}
      {activeMessagePost && isLoggedIn && (
        <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 transition-all'>
          <div className='w-full max-w-2xl bg-[#08090d] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[520px] relative'>
            <button
              onClick={() => setActiveMessagePostId(null)}
              className='absolute top-3 right-3 z-30 bg-gray-900/80 hover:bg-gray-800 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border border-gray-700 transition cursor-pointer'
            >
              ✕
            </button>

            {/* Panel Kiri: Kontak */}
            <div className='w-full md:w-2/5 border-b md:border-b-0 md:border-r border-gray-800 bg-[#0c0d12] flex flex-col'>
              <div className='p-4 border-b border-gray-800/80'>
                <h3 className='text-xs font-bold text-white uppercase tracking-wider'>
                  Direct Messages
                </h3>
                <p className='text-[10px] text-gray-400 mt-0.5'>
                  {currentThreads.length} Kontak Mengirim Pesan
                </p>
              </div>
              <div className='flex-1 overflow-y-auto divide-y divide-gray-900/60'>
                {currentThreads.length > 0 ? (
                  currentThreads.map((thread) => {
                    const lastMsg = thread.messages[thread.messages.length - 1];
                    const isSelected = activeThread?.id === thread.id;
                    return (
                      <button
                        key={thread.id}
                        onClick={() => setActiveThreadId(thread.id)}
                        className={`w-full p-3 flex items-center gap-3 text-left transition cursor-pointer ${
                          isSelected
                            ? 'bg-purple-900/20 border-l-4 border-purple-500'
                            : 'hover:bg-gray-900/40'
                        }`}
                      >
                        <img
                          src={thread.contactAvatar}
                          alt={thread.contactName}
                          className='w-10 h-10 rounded-full object-cover border border-gray-700 flex-shrink-0'
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/post.png';
                          }}
                        />
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center justify-between'>
                            <h4 className='text-xs font-bold text-white truncate'>
                              {thread.contactName}
                            </h4>
                            <span className='text-[9px] text-gray-500'>
                              {lastMsg?.time}
                            </span>
                          </div>
                          <p className='text-[11px] text-gray-400 truncate mt-0.5'>
                            {lastMsg ? lastMsg.text : 'Belum ada pesan'}
                          </p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className='p-6 text-center text-gray-500 text-xs'>
                    Tidak ada kontak.
                  </div>
                )}
              </div>
            </div>

            {/* Panel Kanan: Area Percakapan Chat */}
            <div className='w-full md:w-3/5 flex flex-col bg-[#08090d] h-full'>
              {activeThread ? (
                <>
                  <div className='p-3.5 border-b border-gray-800 bg-[#0c0d12] flex items-center gap-3'>
                    <img
                      src={activeThread.contactAvatar}
                      alt={activeThread.contactName}
                      className='w-8 h-8 rounded-full object-cover border border-purple-500/80'
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/post.png';
                      }}
                    />
                    <div>
                      <h4 className='text-xs font-bold text-white'>
                        {activeThread.contactName}
                      </h4>
                      <p className='text-[9px] text-purple-400'>Online</p>
                    </div>
                  </div>

                  <div className='flex-1 overflow-y-auto p-4 space-y-3'>
                    {activeThread.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                            msg.isMe
                              ? 'bg-[#7c3aed] text-white rounded-br-none shadow-md'
                              : 'bg-[#121318] border border-gray-800 text-gray-200 rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className='text-[9px] text-gray-500 mt-1 px-1'>
                          {msg.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={handleSendMessage}
                    className='p-3 border-t border-gray-800 bg-[#0c0d12] flex items-center gap-2'
                  >
                    <input
                      type='text'
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      placeholder={`Pesan untuk ${activeThread.contactName}...`}
                      className='flex-1 bg-[#121318] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition'
                    />
                    <button
                      type='submit'
                      className='px-3.5 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-xs font-bold text-white rounded-xl transition shadow-lg shadow-purple-600/30 cursor-pointer'
                    >
                      Kirim
                    </button>
                  </form>
                </>
              ) : (
                <div className='h-full flex items-center justify-center text-gray-500 text-xs'>
                  Pilih percakapan untuk memulai chat.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING BOTTOM NAVIGATION BAR */}
      <nav className='fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c0d12]/90 border border-gray-800/80 backdrop-blur-2xl px-6 py-2.5 rounded-full flex items-center gap-8 shadow-2xl z-40'>
        <Link
          href='/feed'
          className='flex flex-col items-center text-[#8b5cf6] text-xs font-semibold'
        >
          <span className='text-base'>🏠</span>
          <span>Home</span>
        </Link>
        <Link
          href='/create-post'
          className='w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-bold shadow-lg shadow-purple-600/40 text-xl hover:bg-[#6d28d9] transition'
        >
          +
        </Link>
        <Link
          href='/profile'
          className='flex flex-col items-center text-gray-400 hover:text-white text-xs font-semibold transition'
        >
          <span className='text-base'>👤</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}

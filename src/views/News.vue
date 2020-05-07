<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <h2 class="primary--text">Новости</h2>
      </v-card-text>
    </v-card>
    <div class="row flex-nowrap">
      <div class="col page-navigation">
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
        </v-card>
      </div>
      <div class="col page-content">
        <news-item v-for="item in news" :key="item._id" :page="item" />
      </div>
      <div class="col page-info">
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="card-avatar"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    NewsItem: () => import("../components/news/NewsItem")
  },
  data: () => ({
    news: [
      {
        _id: 1,
        title: "Инструкция по работе в ЭИОС",
        creator: "Пользователь Администратор",
        publishedBy: new Date(1588237996509),
        content:
          '<b>Уважаемые пользователи ЭИОС ВолгГТУ!</b> <p>Предлагаем вашему вниманию краткую инструкцию по работе в ЭИОС. В инструкции дана информация по работе с личным кабинетом пользователя и заполнению портфолио. Все ваши вопросы и предложения вы можете оставить в университетском форуме в курсе "ЭИОС" С уважением, Администрация ЭИОС ВолгГТУ.</p>',
        attachments: [
          {
            name: "HowTo1.pdf",
            type: "pdf",
            link: "/404"
          }
        ]
      },
      {
        _id: 2,
        title: "Почта ВолгГТУ",
        creator: "Пользователь Администратор",
        publishedBy: new Date(1588237996509),
        content:
          "<b>Уважаемые пользователи ЭИОС ВолгГТУ!</b><p>Обращаем ваше внимание на то, что полученный вами логин и пароль позволяют авторизоваться в ЭИОС ВолгГТУ и одновременно являются именем пользователя и паролем для получения корпоративной почты университета.</p><p>В личном кабинете ЭИОС вы можете поменять полученный корпоративный e-mail:</p><ul><li>на вашу почту в другом домене, отличном от vstu.ru</li><li>на вашу уже существующую почту в домене vstu.ru</li></ul><p>В настоящее время заявки на иные способы изменения выданных вам учётных данных не рассматриваются.</p><p>Обращаем ваше внимание, что изменить пароль сформированного для вас в домене vstu.ru почтового ящика через личный кабинет ЭИОС нельзя.</p><p>Для доступа к корпоративной почте вы можете использовать любой почтовый клиент (имя POP3- и SMTP-серверов - ns2.vstu.ru. Порт POP3 - 110, Порт SMTP - 587).</p><p>С целью упрощения использования корпоративной почте в настоящее время проводятся работы по настройке доступа через Web-интерфейс.</p><p>Об окончании работ будет сообщено позднее.</p><p>С уважением, Администрация ЭИОС ВолгГТУ.</p>",
        attachments: []
      }
    ]
  })
};
</script>
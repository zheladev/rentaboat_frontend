<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">Inbox</div>
      <v-card flat outlined rounded="0" class="my-2">
          <v-list three-line class="py-0" >
          <template v-for="(chat, index) in chats">
              <v-divider v-if="index > 0 && index < chats.length" :key="`${index}-divider`"></v-divider>
            <v-list-item :key="index">
              <v-list-item-avatar>
                <v-img :src="getChatParticipantImage(chat)"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                    {{getChatParticipantName(chat)}}
                </v-list-item-title>
                <v-list-item-subtitle class="chat-last-message">
                    <v-icon v-if="chat.lastMessage.user.id === user.id" small class="d-inline chat-sent-icon">check</v-icon>
                    <div class="text-body-2 d-inline">{{chat.lastMessage.content}}</div> 
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-container>
    <v-divider></v-divider>
    <v-container class="content-section-container">
      <div class="headline">PLACEHOLDER</div>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Messages",
  data: () => ({
    chats: [
      {
        id: "7e82ace5-feff-436a-82bb-ecff7236257a",
        creator: {
          firstName: "Billy",
          lastName: "Herrington",
          id: "7e82ace5-feff-432d-82bb-ecff7236257a",
          img: "https://i1.sndcdn.com/avatars-000411292317-dt2f28-t500x500.jpg"
        },
        receiver: {
          firstName: "Aitor",
          lastName: "Zhe Zhe",
          id: "81765a71-8b06-4fa3-b75b-0bbeddca3ac3",
        },
        createdAt: "2020-11-05T00:00:00.001Z",
        lastMessage: {
          id: "7e823ce5-feff-436a-82bb-ecff7236257a",
          user: {
            firstName: "Billy",
            lastName: "Herrington",
            id: "81as5a71-8b06-4fa3-b75b-0bbeddca3ac3",
          },
          content: "Hello.",
          createdAt: "2020-11-05T00:00:00.001Z",
        },
      },
      {
        id: "7e82ace5-feff-436a-8dbb-ecff7236257a",
        creator: {
          firstName: "Aitor",
          lastName: "Zhe Zhe",
          id: "81765a71-8b06-4fa3-b75b-0bbeddca3ac3",
        },
        receiver: {
          firstName: "Danny",
          lastName: "Lee",
          id: "7e82ace5-feff-436d-82bb-ecff723d257a",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFKq_dob_bJC40ba4x6mrNelFI0kVA5L-3Ow&usqp=CAU"
        },
        createdAt: "2020-12-15T00:00:00.001Z",
        lastMessage: {
          id: "7e823ce5-feff-436a-82bb-ecff7236257a",
          user: {
            firstName: "Aitor",
            lastName: "Zhe Zhe",
            id: "81765a71-8b06-4fa3-b75b-0bbeddca3ac3"
          },
          content: "Yeah, I loved the boat.",
          createdAt: "2020-12-22T19:40:00.001Z",
        },
      },
    ],
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    getChatParticipantName(chat) {
      let fullName = `${chat.creator.firstName} ${chat.creator.lastName}`;
      if (chat.creator.id === this.user.id) {
        fullName = `${chat.receiver.firstName} ${chat.receiver.lastName}`;
      }
      return fullName;
    },
    getChatParticipantImage(chat) {
        return chat.creator.id === this.user.id ? chat.receiver.img : chat.creator.img;
    }
  },
};
</script>

<style scoped>
.content-section-container {
  padding: 2em 2em 1em 2em;
}
.chat-sent-icon {
    vertical-align: -3px;
    padding-right: 5px;
}
</style>
<template>
  <div class="modal fade" id="ModalCreate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Question</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-ModalCreateQuestion modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Title:</label>
              <input v-model="formNewQuestion.title" type="text" class="form-control" id="recipient-name" required=""/>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Content:</label>
              <textarea v-model="formNewQuestion.question_content" class="form-control" id="message-text" required=""/></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="toCreateQuestion()" type="button" data-dismiss="modal" class="btn btn-dark">Send Question</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import swal from 'sweetalert2'
export default {
  name: 'ModalCreateQuestion',
  data: function () {
    return {
      formNewQuestion: {
        title: '',
        question_content: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'saveQuestion'
    ]),
    toCreateQuestion () {
      let storage = localStorage.getItem('token')
      if (storage) {
        let inputTitleQuestion = this.formNewQuestion.title.trim()
        let inputContentQuestion = this.formNewQuestion.question_content.trim()
        if (inputTitleQuestion && inputContentQuestion) {
          let newQuestion = {
            title: inputTitleQuestion,
            question_content: inputContentQuestion,
            token: localStorage.getItem('token')
          }
          this.saveQuestion(newQuestion)
        } else {
          swal(
            'Oops...',
            'Title & Question must be filled!',
            'error'
          )
        }
      }
    }
  }
}
</script>

<style>
.modal-ModalCreateQuestion{
  text-align: left;
}

</style>

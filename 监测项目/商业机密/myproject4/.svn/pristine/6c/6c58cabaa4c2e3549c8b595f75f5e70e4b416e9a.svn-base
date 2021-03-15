<template>
  <div>
    <center v-if="isCenter"></center>
    <branch v-if="isBranch"></branch>
  </div>
</template>
<script>
import Center from './add'
import Branch from './branch'
import { mapGetters } from 'vuex'
export default {
  components: { Center, Branch },
  computed: {
    ...mapGetters(['institution']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    }
  }
}
</script>


<script setup lang="ts">
type pageVariant = 'default' | 'flexible'
const { variant = 'default' } = defineProps<{ variant?: pageVariant }>()
</script>

<template>
    <div class="page-container relative h-full overflow-auto bg-gray-100">
        <div :class="['min-h-full','relative','page-content',variant === 'flexible'?'flex flex-1 items-center justify-center':'w-full']">
            <slot></slot>
        </div>
    </div>
</template>
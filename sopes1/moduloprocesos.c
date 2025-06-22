#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/sched/signal.h>  // for_each_process

#define PROC_NAME "procesos_info"

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Tu Nombre");
MODULE_DESCRIPTION("Modulo para mostrar informacion de procesos en /proc");
MODULE_VERSION("1.0");

static int mostrar_info(struct seq_file *m, void *v) {
    struct task_struct *task;
    int total = 0, running = 0, sleeping = 0, zombie = 0, stopped = 0;

    for_each_process(task) {
        total++;

        switch (task->state) {
            case TASK_RUNNING:
                running++;
                break;
            case TASK_INTERRUPTIBLE:
            case TASK_UNINTERRUPTIBLE:
                sleeping++;
                break;
            case __TASK_STOPPED:
            case TASK_STOPPED:
                stopped++;
                break;
            case EXIT_ZOMBIE:
            case TASK_DEAD:
                zombie++;
                break;
            default:
                break;
        }
    }

    seq_printf(m,
        "{\n"
        "  \"procesos_corriendo\": %d,\n"
        "  \"total_procesos\": %d,\n"
        "  \"procesos_durmiendo\": %d,\n"
        "  \"procesos_zombie\": %d,\n"
        "  \"procesos_parados\": %d\n"
        "}\n",
        running, total, sleeping, zombie, stopped
    );

    return 0;
}

static int abrir_proc(struct inode *inode, struct file *file) {
    return single_open(file, mostrar_info, NULL);
}

static const struct proc_ops operaciones_proc = {
    .proc_open = abrir_proc,
    .proc_read = seq_read,
    .proc_lseek = seq_lseek,
    .proc_release = single_release,
};

static int __init modulo_init(void) {
    proc_create(PROC_NAME, 0, NULL, &operaciones_proc);
    printk(KERN_INFO "Modulo cargado: /proc/%s\n", PROC_NAME);
    return 0;
}

static void __exit modulo_exit(void) {
    remove_proc_entry(PROC_NAME, NULL);
    printk(KERN_INFO "Modulo descargado: /proc/%s\n", PROC_NAME);
}

module_init(modulo_init);
module_exit(modulo_exit);
